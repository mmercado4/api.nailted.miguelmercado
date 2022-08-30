export interface Employee {
  id: number;
  name: string;
  surname: string;
  address: string;
  phone: string;
  email: string;
  birthdate: string;
}

export interface Pagination {
  offset: number | string;
  limit: number | string;
}
