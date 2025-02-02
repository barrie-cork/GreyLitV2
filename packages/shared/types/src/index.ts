// Core type definitions
export interface User {
  id: string;
  email: string;
  profile?: UserProfile;
}

export interface UserProfile {
  name: string;
  organization?: string;
  preferences?: Record<string, unknown>;
}

// Service interfaces will be added here
