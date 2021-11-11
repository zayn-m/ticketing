export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  status?: boolean;
  role?: string;
  resetPasswordToken?: string;
  resetPasswordExpiry?: any;
  date?: any;
}

export interface LoggedUser {
  accessToken: string;
  tokenType: string;
  role: string;
}
