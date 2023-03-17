import "../styles/globals.css";
import ReactQueryWrapper from "./ReactQueryWrapper";

export const metadata = {
  title: "LcsGoldPrice",
  description: "Gold price per 1k in BRL after taxes from G2G and Payoneer.",
  icons: {
    icon: "../../public/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-slate-800 text-slate-300 font-sourcesanspro`}>
        {<ReactQueryWrapper>{children}</ReactQueryWrapper>}
      </body>
    </html>
  );
}
