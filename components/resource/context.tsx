import { createContext } from "react";

export const PriceContext = createContext({
  price: -1,
  setPrice: (price: number) => {}
});