export interface User {
  email: string;
  name: string;
}

export interface UserCredentials extends User {
  password: string;
}