
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
   token:string;
   username:string;
   email:string;
   role: Role
}
