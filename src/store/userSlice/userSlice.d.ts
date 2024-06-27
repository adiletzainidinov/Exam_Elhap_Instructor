export interface UserProfile {
    id: string;
    userName: string;
    role: string;
    email: string;
    isActive: string;
    photo: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UserState {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
  }
  