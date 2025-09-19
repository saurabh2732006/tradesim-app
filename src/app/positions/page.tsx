import { HoldingsTable } from "@/components/dashboard/holdings-table";

export default function PositionsPage() {
  return (
     <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">My Positions</h1>
        <p className="text-muted-foreground">An overview of all the stocks you currently own.</p>
      </header>
      <HoldingsTable />
    </div>
  );
}
