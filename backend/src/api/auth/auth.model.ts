export type TGoogleUserResponse = {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  id: string;
};

export type TAuthRecordResponse<T> = {
  user: T;
  token: string;
};
