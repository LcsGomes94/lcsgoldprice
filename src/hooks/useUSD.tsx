import { useQuery } from "@tanstack/react-query";
import z from "zod";

const usdValidator = z.object({
  USDBRL: z.object({
    bid: z.string(),
    ask: z.string(),
  }),
});

export function useUSD() {
  async function fetchUSD() {
    const query = "https://economia.awesomeapi.com.br/last/USD-BRL";
    const response = await fetch(query);
    const json = await response.json();

    const bid = Number(usdValidator.parse(json).USDBRL.bid);
    const ask = Number(usdValidator.parse(json).USDBRL.ask);
    const averagePrice = ask - (ask - bid) / 2;

    return Number(averagePrice.toFixed(4));
  }

  return useQuery(["usd"], fetchUSD, {
    staleTime: 5 * 1000,
    cacheTime: 5 * 1000,
    refetchInterval: 5 * 1000,
  });
}
