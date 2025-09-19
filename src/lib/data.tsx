import type { Stock, PortfolioData, NewsArticle } from "@/lib/types";

const AppleLogo = (props: { className?: string }) => (
  <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.144 14.328c-.37.984-.856 1.92-1.44 2.784-.576.88-1.152 1.632-1.872 2.256-.736.648-1.536 1-2.432 1.008-.88 0-1.744-.336-2.52-1.008-.72-.648-1.32-1.44-1.836-2.328-.528-.912-.912-1.92-1.14-3.024-.24-1.128-.24-2.28-.024-3.48.216-1.176.624-2.256 1.248-3.264.624-1.008 1.404-1.776 2.352-2.328.984-.552 2.016-.816 3.12-.768.216.936.144 1.872-.216 2.808-.36.912-.936 1.68-1.728 2.304-.792.624-1.632.96-2.544.96-.288 0-.576-.024-.864-.072-.576-.096-1.104-.312-1.584-.648-.48-.336-.888-.792-1.2-1.368-.336-.576-.54-1.224-.624-1.944-.072-.72.036-1.44.336-2.16.024-.048.048-.096.096-.144.024.024.024.024.048.048-1.248.528-2.232 1.488-2.928 2.88-.696 1.392-1.056 2.916-1.056 4.56 0 1.2.216 2.352.648 3.456.432 1.104 1.032 2.088 1.788 2.928.792.864 1.68 1.488 2.664 1.872.96.384 1.944.576 2.928.576.912 0 1.8-.192 2.664-.576.912-.384 1.74-.984 2.496-1.8.72-.792 1.284-1.728 1.692-2.808.408-1.08.6-2.208.576-3.384-.336-.048-.672-.072-1.008-.072-1.032 0-2.016.312-2.928.936a5.59 5.59 0 0 0-.216.192c.048-.024.096-.048.144-.072zM16.488 2.4c.096-.912.48-1.728 1.14-2.4.024 0 .024 0 .048-.024-.024.024-.024.024-.048.024-.768.048-1.536.36-2.28.936-.72.576-1.2 1.32-1.416 2.256-.12.864-.024 1.728.264 2.592.768-.048 1.536-.36 2.28-.936.432-.36.744-.816.912-1.368z" />
  </svg>
);

const GoogleLogo = (props: { className?: string }) => (
  <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.997 12.373c0-.836-.076-1.646-.21-2.427h-10.72v4.58h6.12c-.26 1.48-1.03 2.74-2.28 3.58v3.01h3.86c2.26-2.09 3.56-5.17 3.56-8.74z" fill="#4285F4"/>
    <path d="M12.067 23.333c3.22 0 5.91-1.06 7.88-2.88l-3.86-3.01c-1.07.72-2.45 1.15-4.02 1.15-3.09 0-5.7-2.09-6.64-4.9H1.477v3.1c1.95 3.86 5.75 6.54 10.59 6.54z" fill="#34A853"/>
    <path d="M5.427 13.793c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.1H1.477c-1.28 2.54-1.28 5.64 0 8.18l3.95-3.09z" fill="#FBBC05"/>
    <path d="M12.067 4.933c1.75 0 3.32.6 4.58 1.8l3.43-3.43c-2.1-1.95-4.88-3.14-7.98-3.14-4.84 0-8.64 2.68-10.59 6.54l3.95 3.09c.94-2.81 3.55-4.9 6.61-4.9z" fill="#EA4335"/>
  </svg>
);

const MicrosoftLogo = (props: { className?: string }) => (
  <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" /></svg>
);

const AmazonLogo = (props: { className?: string }) => (
  <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.51 1.26c-.43 0-.82.23-.91.33-.21.23-.21.57 0 .8l2.94 3.25c.1.1.2.14.33.14.05 0 .1 0 .14-.02.2-.05.33-.23.33-.44V2.05c0-.4-.3-.8-.8-.8h-2.03Zm19.04 1.2c-.3-.18-.68-.18-1 0l-4.7 3.2c-.2.15-.33.37-.33.6v9.2c0 .2.08.38.23.5.15.14.36.2.57.1l4.7-2.3c.3-.15.5-.46.5-.8V3.3c0-.3-.2-.6-.5-.84ZM20.65 14.2c.4 0 .74-.28.82-.67l.14-.65c0-.4-.28-.73-.67-.8-.4-.08-.8.15-.9.57l-.15.65c-.04.4.2.73.6.83l.03.02ZM9.3 14.8c-.1-.2-.28-.3-.5-.3-.4 0-.7.3-.7.7v4c0 .4.3.7.7.7.22 0 .4-.1.5-.3l2.8-4.4c.1-.2.1-.48 0-.68L9.3 14.8Zm13.5-3.3c-.6-.2-1.2.1-1.5.7l-3.3 5.4c-.2.3-.2.6 0 .9l.7 1.2c.2.3.4.4.7.4.3 0 .6-.1.8-.4l3.3-5.4c.3-.6.1-1.2-.4-1.5l-.3-.12ZM3.81 7.2c-2.12 0-3.8 1.7-3.8 3.8s1.7 3.8 3.8 3.8h.42c.4 0 .73-.3.73-.72s-.3-.73-.72-.73h-.42c-1.32 0-2.36-1.04-2.36-2.36s1.04-2.36 2.36-2.36h12.55c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H3.8ZM16.35 22.8c-1.1 1.2-2.7 1.9-4.5 1.9-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4c1.6 0 3.1.6 4.2 1.6.4.4.4.9 0 1.3-.4.4-.9.4-1.3 0-1.7-1.6-4.5-1.7-6.2-.2-1.8 1.5-2 4.1-.3 5.8 1.6 1.7 4.5 1.7 6.2.2.4-.4.9-.4 1.3 0 .4.4.4 1 0 1.2Z" /></svg>
);

const TeslaLogo = (props: { className?: string }) => (
  <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.518 20.354h-2.98L18.42 5.408h-2.98l-1.07 14.946h-2.98L10.272 5.408H7.292L6.222 20.354H3.242L4.312 5.408H1.332L3.066 0h17.868l1.734 5.408h-2.98zM9.538 24h4.924l-2.462-5.78z" /></svg>
);


export const initialStocks: Stock[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: 172.23, change: 1.5, changePercent: 0.88, logo: AppleLogo },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 139.76, change: -0.5, changePercent: -0.36, logo: GoogleLogo },
  { ticker: 'MSFT', name: 'Microsoft Corp.', price: 334.6, change: 2.1, changePercent: 0.63, logo: MicrosoftLogo },
  { ticker: 'AMZN', name: 'Amazon.com, Inc.', price: 137.85, change: -1.2, changePercent: -0.87, logo: AmazonLogo },
  { ticker: 'TSLA', name: 'Tesla, Inc.', price: 234.86, change: 5.6, changePercent: 2.44, logo: TeslaLogo },
];

const now = new Date();
export const initialPortfolio: PortfolioData = {
  cash: 100000,
  holdings: [],
  history: Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (29 - i));
    const value = 100000 + Math.sin(i / 5) * 1000 + Math.random() * 500 - 250;
    return { time: date.toISOString().slice(0, 10), value: parseFloat(value.toFixed(2)) };
  }),
};

export const initialNews: NewsArticle[] = [
  {
    id: '1',
    source: 'MarketWatch',
    headline: 'Tech Stocks Rally as Inflation Fears Subside',
    summary: 'Major technology stocks saw significant gains today after the latest CPI report showed inflation may be cooling down.',
    publishedAt: new Date(now.setDate(now.getDate() - 1)).toISOString(),
    imageUrl: 'https://picsum.photos/seed/n1/600/400',
    imageHint: 'business chart'
  },
  {
    id: '2',
    source: 'Reuters',
    headline: 'Federal Reserve Hints at Pausing Rate Hikes',
    summary: 'In a recent speech, the Fed chair suggested that the central bank may hold interest rates steady in the next meeting.',
    publishedAt: new Date(now.setDate(now.getDate() - 1)).toISOString(),
    imageUrl: 'https://picsum.photos/seed/n2/600/400',
    imageHint: 'city stockmarket'
  },
  {
    id: '3',
    source: 'Bloomberg',
    headline: 'Amazon (AMZN) Unveils New AI-Powered Logistics Network',
    summary: 'Amazon announced a complete overhaul of its logistics network, leveraging AI to improve delivery times and efficiency.',
    publishedAt: new Date(now.setDate(now.getDate() - 2)).toISOString(),
    imageUrl: 'https://picsum.photos/seed/n3/600/400',
    imageHint: 'trading computer'
  },
  {
    id: '4',
    source: 'The Wall Street Journal',
    headline: 'Is Tesla (TSLA) Overvalued? Analysts Are Divided',
    summary: 'Despite a strong performance, some analysts are raising concerns about Tesla\'s high valuation compared to traditional automakers.',
    publishedAt: new Date(now.setDate(now.getDate() - 2)).toISOString(),
    imageUrl: 'https://picsum.photos/seed/n4/600/400',
    imageHint: 'bull bear'
  },
];
