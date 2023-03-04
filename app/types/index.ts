export interface ErrorData extends Error {
  status?: number;
}

export interface UserData {
  email: string;
  id: string;
  password: string;
}

export type AuthData = Pick<UserData, 'email' | 'password'>;

export type ProfileData = Pick<UserData, 'email' | 'id'>;

export type ElectricityCategory = 'usage' | 'customer';

export interface ElectricityUsageOptions {
  day: string;
  month: string;
  year: string;
}

export interface ElectricityCustomerOptions extends ElectricityUsageOptions {
  meteringPointId: number;
}
