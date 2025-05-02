export type JwtPayload = {
  id: number;
  email: string;
  firstName: string;
};

export type JwtUserPayload = {
  id: number;
  email: string;
  iat: number;
  exp: number;
};
