"use client";

import { useUSD } from "@/hooks/useUSD";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
    const [goldPrice, setGoldPrice] = useState("");
    const [calculatedPrice, setCalculatedPrice] = useState("0.0000");
    const { data: usd } = useUSD();

    useEffect(() => {
        setCalculatedPrice(calculatePrice(Number(goldPrice)));
    }, [usd]);

    function handleGoldPriceChange(e: ChangeEvent<HTMLInputElement>) {
        const price = e.target.value;
        setGoldPrice(price);
        setCalculatedPrice(calculatePrice(Number(price)));
    }

    function calculatePrice(goldPrice: number) {
        const salesTax = 1 - 0.0899;
        const withdrawTax = 1 - 0.0199;
        const conversionTax = 1 - 0.0330;

        let finalPrice = 0;

        if (usd) {
            finalPrice = goldPrice * salesTax * withdrawTax * conversionTax * 1000 * usd;
        }

        return finalPrice.toFixed(4);
    }

    return (
        <main className={`w-full h-screen flex flex-col items-center justify-center gap-8`}>
            <div className={`flex flex-col items-center`}>
                <h1 className={`text-xl bg-gradient-to-tr bg-clip-text text-transparent from-red-600 via-red-200 to-white`}>USD Price</h1>
                <h2 className={`text-3xl font-bold`}>{usd || `0.0000`}</h2>
            </div>

            <div className={`bg-gradient-to-tr from-teal-500 to-cyan-500 rounded-xl p-0.5`}>
                <div className={`flex gap-7 text-2xl items-center rounded-xl px-7 py-4 bg-slate-800`}>
                    <h1 className={`text-xl w-24 text-center`}>Gold Price</h1>
                    <div className={`h-10 w-0.5 bg-gradient-to-b from-teal-500 to-cyan-500`}></div>
                    <input
                        autoFocus={true}
                        type="number"
                        className={`outline-none w-24 text-center bg-inherit font-semibold placeholder:opacity-50 focus:placeholder:opacity-0`}
                        onChange={handleGoldPriceChange}
                        value={goldPrice}
                        placeholder={`0.000000`}
                    />
                </div>
            </div>

            <div className={`flex flex-col items-center`}>
                <h1 className={`text-xl bg-gradient-to-tr bg-clip-text text-transparent from-green-700 to-yellow-400`}>R$/K</h1>
                <h2 className={`text-3xl font-bold`}>{calculatedPrice}</h2>
            </div>
        </main>
    );
}
