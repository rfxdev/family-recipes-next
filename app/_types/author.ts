export type AuthorType = 'chef' | 'family' | 'restaurant' | 'unknown';

export interface Author {
  id: string;
  name: string;
  type: AuthorType;
}
