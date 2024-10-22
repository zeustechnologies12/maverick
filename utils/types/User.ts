export interface User {
  first_name: string;
  last_name: string;
  username?: string;
  phone_number: string;
  email: string;
  password?: string;
  role: string[];
}
