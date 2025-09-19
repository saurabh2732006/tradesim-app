import type { Stock, PortfolioData, NewsArticle } from "@/lib/types";
import { FC } from 'react';

// Stock Logos for Indian Companies
const RelianceLogo: FC<{ className?: string }> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#0033A0"/>
        <path d="M14.9497 9.05025C13.4334 7.53393 11.2334 7.23393 9.33342 8.13393L15.8661 14.6666C16.7661 12.7666 16.4661 10.5666 14.9497 9.05025Z" fill="url(#paint0_linear_1_2)"/>
        <path d="M8.1333 15.8661C9.64962 17.3824 11.8496 17.6824 13.7496 16.7824L7.21695 10.25C6.31695 12.15 6.61695 14.35 8.1333 15.8661Z" fill="url(#paint1_linear_1_2)"/>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="12.6" y1="7.6" x2="15.4" y2="11.4" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="1" stopColor="#E0E0E0"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1_2" x1="9.6" y1="16.4" x2="7.8" y2="11.6" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="1" stopColor="#E0E0E0"/>
            </linearGradient>
        </defs>
    </svg>
);

const TcsLogo: FC<{ className?: string }> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#4A4A4A"/>
        <path d="M6 11H18V13H6V11Z" fill="#58BBE3"/>
        <path d="M9.5 8H14.5L12 10.5L9.5 8Z" fill="#58BBE3"/>
        <path d="M9.5 16H14.5L12 13.5L9.5 16Z" fill="#58BBE3"/>
    </svg>
);

const HdfcLogo: FC<{ className?: string }> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="#004C8F"/>
        <path d="M6 6H18V18H6V6Z" fill="white"/>
        <path d="M8 8H16V16H8V8Z" fill="#E40000"/>
    </svg>
);

const InfosysLogo: FC<{ className?: string }> = (props) => (
  <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" fill="#0078C1"/>
    <path d="M11.232 7.095l-2.923.473L9.75 16.905l2.924-.473L11.232 7.095zM14.75 7.095l-2.923.473L13.27 16.905l2.923-.473L14.75 7.095z" fill="#FFF"/>
  </svg>
);

const IciciLogo: FC<{ className?: string }> = (props) => (
  <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 11.01V0h2.95l7.155 8.164L10.08 11.01H0zm24 1.98v11.01h-2.95L13.895 15.836 13.92 13h10.08z" fill="#EC6610"/>
    <path d="M10.08 11.01 2.95 0h11.13L24 11.01H10.08zm3.84 1.98 7.155 11.01H2.95L0 13h13.92z" fill="#0056A3"/>
  </svg>
);


export const initialStocks: Stock[] = [
  { ticker: 'RELIANCE', name: 'Reliance Industries', price: 2850.55, change: 25.3, changePercent: 0.89, logo: RelianceLogo },
  { ticker: 'TCS', name: 'Tata Consultancy', price: 3855.10, change: -12.75, changePercent: -0.33, logo: TcsLogo },
  { ticker: 'HDFCBANK', name: 'HDFC Bank', price: 1530.80, change: 8.10, changePercent: 0.53, logo: HdfcLogo },
  { ticker: 'INFY', name: 'Infosys', price: 1510.25, change: -5.40, changePercent: -0.36, logo: InfosysLogo },
  { ticker: 'ICICIBANK', name: 'ICICI Bank', price: 1125.90, change: 15.20, changePercent: 1.37, logo: IciciLogo },
];

const now = new Date();
export const initialPortfolio: PortfolioData = {
  cash: 100000,
  holdings: [],
  history: Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (29 - i));
    const value = 100000 + Math.sin(i / 5) * 5000 + Math.random() * 2500 - 1250;
    return { time: date.toISOString().slice(0, 10), value: parseFloat(value.toFixed(2)) };
  }),
  transactions: [],
};

export const initialNews: NewsArticle[] = [
  {
    id: '1',
    source: 'Livemint',
    headline: 'Nifty 50, Sensex snap 5-day winning streak; IT stocks drag',
    summary: 'The Indian stock market benchmarks, Sensex and Nifty 50, ended lower in highly volatile trade today, dragged by selling in IT stocks.',
    publishedAt: new Date(now.setDate(now.getDate() - 1)).toISOString(),
    imageUrl: 'https://picsum.photos/seed/n1/600/400',
    imageHint: 'business chart'
  },
  {
    id: '2',
    source: 'Economic Times',
    headline: 'RBI holds repo rate steady, maintains optimistic growth outlook.',
    summary: 'The Reserve Bank of India\'s monetary policy committee has decided to keep the repo rate unchanged at 6.5%, signaling confidence in the economic recovery.',
    publishedAt: new Date(now.setDate(now.getDate() - 1)).toISOString(),
    imageUrl: 'https://picsum.photos/seed/n2/600/400',
    imageHint: 'city stockmarket'
  },
  {
    id: '3',
    source: 'Business Standard',
    headline: 'Reliance Industries (RIL) to invest heavily in green energy sector.',
    summary: 'RIL chairman announced a massive investment plan for the renewable energy sector, aiming to be a net-zero carbon company by 2035.',
    publishedAt: new Date(now.setDate(now.getDate() - 2)).toISOString(),
    imageUrl: 'https://picsum.photos/seed/n3/600/400',
    imageHint: 'trading computer'
  },
  {
    id: '4',
    source: 'Moneycontrol',
    headline: 'SEBI tightens norms for IPOs and insider trading.',
    summary: 'The market regulator has introduced new regulations to enhance transparency and protect retail investors in initial public offerings and curb insider trading.',
    publishedAt: new Date(now.setDate(now.getDate() - 2)).toISOString(),
    imageUrl: 'https://picsum.photos/seed/n4/600/400',
    imageHint: 'bull bear'
  },
];
