export type JwtPayload = {
  id: number;
  email: string;
};

export type JwtUserPayload = {
  id: number;
  email: string;
  iat: number;
  exp: number;
};
