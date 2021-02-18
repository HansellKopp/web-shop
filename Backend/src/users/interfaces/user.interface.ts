export interface User {
  id?: string,
  given_name?: string;
  family_name?: string;
  nickname?: string;
  name?: string;
  picture?: string;
  updated_at?: number;
  email?: string;
  email_verified?: boolean;
  sub?: string;
}