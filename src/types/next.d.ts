import next, { NextApiRequest } from "next";

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

declare module "next" {
  type TypedApiRequest<B = Record<string, string>> = Override<
    NextApiRequest,
    { body: Partial<B> }
  >;
}
