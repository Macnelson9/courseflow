export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Classmate extends Student {}
