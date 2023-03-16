import { useQuery } from "@tanstack/react-query";
import z from "zod";

const usdValidator = z.object({
  USDBRL: z.object({
    low: z.string(),
  }),
});

export function useUSD() {
  async function fetchUSD() {
    const query = "https://economia.awesomeapi.com.br/last/USD-BRL";
    const response = await fetch(query);
    const json = await response.json();

    return Number(usdValidator.parse(json).USDBRL.low);
  }

  return useQuery(["usd"], fetchUSD, {
    staleTime: 5 * 1000,
    cacheTime: 5 * 1000,
    refetchInterval: 5 * 1000,
  });
}
