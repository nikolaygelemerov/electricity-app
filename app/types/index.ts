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

export interface ElectricityQueryOptions {
  day: string;
  meteringPointId: string;
  month: string;
  year: string;
}

export interface ElectricityQueryFromTo {
  from: string;
  to: string;
}

export interface ElectricityPriceData {
  currency: string;
  price: number;
  timestamp: number;
}

export interface ElectricityUsageData {
  kwh: string;
  timestamp: number;
}

export interface ReadJSONLinesParams {
  from: string;
  meteringPointId: string;
  to: string;
}
