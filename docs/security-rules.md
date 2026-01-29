# Security

Platform-agnostic security architecture for the Family Recipes application. Covers Firebase security rules, authentication model, and user management patterns.

---

## Architecture Overview

**Strategy:** Public GitHub repository for portfolio purposes while maintaining privacy for family data.

**Implementation:** Two Firebase projects with environment-based configuration

- **Demo project** (`family-recipes-demo`): Public, seeded with sample data, safe for portfolio
- **Production project** (`family-recipes-prod`): Private family data, secrets injected at build/deploy time

---

## Secrets Management

**Principles:**

- No secrets committed to repository
- Same codebase serves demo and production environments
- Secrets injected via environment variables or build-time configuration
- Public repository safe, private deployments secure

**Environment Variables Required:**

```
FIREBASE_API_KEY
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
```

**Implementation:** Use your platform's standard approach (`.env` files with framework support, build flags, CI/CD secrets, etc.)

---

## Firebase Project Setup

### Demo Project (`family-recipes-demo`)

**Purpose:** Safe for public repository, portfolio demonstrations, development

**Configuration:**

1. Create project in Firebase Console
2. Enable Authentication, Firestore, Storage
3. Deploy relaxed security rules (see Demo Rules below)
4. Seed with sample recipe data
5. Use as default configuration in codebase

### Production Project (`family-recipes-prod`)

**Purpose:** Private family data

**Configuration:**

1. Create project in Firebase Console
2. Enable Authentication, Firestore, Storage
3. Deploy strict security rules (see Production Rules below)
4. Create family member accounts
5. Store credentials securely (password manager, CI/CD secrets)
6. Inject via environment variables only

---

## Authentication Model

### Phase 1: Admin-Managed Users

No public signup. Accounts created manually via Firebase Console.

**Access requires both:**

1. Valid Firebase Authentication session
2. User document in `users` collection with `is_active: true`

This double verification enables easy access revocation without deleting accounts or breaking `author_id` references.

### Phase 2: Invite-Based System

Existing family members can send invite codes to new members.

---

## Firestore Security Rules

Deploy with: `firebase deploy --only firestore:rules`

### Production Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper: Is user authenticated?
    function isSignedIn() {
      return request.auth != null;
    }

    // Helper: Is user in allowlist with active status?
    function isAllowedUser() {
      return isSignedIn() &&
             exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.is_active == true;
    }

    // Users collection: read all (for display names), write own only
    match /users/{userId} {
      allow read: if isAllowedUser();
      allow write: if isSignedIn() && request.auth.uid == userId;
    }

    // Recipes collection: all family can read, only author can modify
    match /recipes/{recipeId} {
      allow read: if isAllowedUser();
      allow create: if isAllowedUser();
      allow update, delete: if isAllowedUser() &&
                              resource.data.author_id == request.auth.uid;
    }

    // Favorites collection: user's own only
    match /favorites/{docId} {
      allow read, write: if isSignedIn() && request.auth.uid == docId;
    }
  }
}
```

### Demo Rules (Relaxed)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Demo: any authenticated user can read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## Storage Security Rules

Deploy with: `firebase deploy --only storage:rules`

### Production Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Recipe images: authenticated users can read/write
    match /recipes/{recipeId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

### Demo Rules (Same as Production)

Camera uploads and image viewing require authentication in both environments.

---

## User Management

### Creating Users (Phase 1)

**Via Firebase Console:**

1. Navigate to Authentication → Users → Add User
2. Enter email and temporary password
3. Send credentials to family member securely
4. Create matching user document in Firestore `users` collection

**User document structure:**

```json
{
  "email": "mom@family.com",
  "display_name": "Mom",
  "unit_preference": "imperial",
  "is_active": true,
  "created_at": "2025-01-27T10:00:00Z"
}
```

**Critical:** Firestore document ID must match the Firebase Auth UID exactly.

### Revoking Access

Set `is_active: false` in the user's Firestore document. Security rules will immediately block all requests.

**Why not delete from Authentication:**

- Preserves `author_id` references in recipes
- Maintains audit trail
- Can reactivate if needed
- Simpler than cascading deletes

---

## Security Checklist

### Source Code

- [ ] All secrets use environment variables (never hardcoded)
- [ ] `.gitignore` excludes environment files and build scripts with secrets
- [ ] Demo Firebase project configured as defaults in codebase
- [ ] Production Firebase credentials stored securely (password manager, CI/CD secrets)

### Firebase Configuration

- [ ] Demo project created with sample data
- [ ] Production project created
- [ ] Firestore rules deployed to both projects
- [ ] Storage rules deployed to both projects

### Runtime Testing

- [ ] User documents created for initial family members
- [ ] Test: Unauthenticated access blocked
- [ ] Test: Authenticated user without user document blocked
- [ ] Test: Inactive user (`is_active: false`) blocked
- [ ] Test: Recipe author can edit their recipes
- [ ] Test: Non-author cannot edit others' recipes
- [ ] Test: All family members can read all recipes

### Development Experience

- [ ] Local development works with demo project (no secrets required)
- [ ] Production deployment injects secrets correctly
- [ ] Demo data suitable for portfolio/screenshots
