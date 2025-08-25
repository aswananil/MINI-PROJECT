import type { WasteEntry, BinStatus } from "@/lib/types";
import StatusCards from "@/components/dashboard/status-cards";
import WasteLogTable from "@/components/dashboard/waste-log-table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

interface OverviewTabProps {
  wasteLog: WasteEntry[];
  binStatus: BinStatus;
}

export default function OverviewTab({ wasteLog, binStatus }: OverviewTabProps) {
  return (
    <div className="grid gap-4 md:gap-8 mt-4">
      <StatusCards binStatus={binStatus} />
      <Card>
        <CardHeader>
          <CardTitle>Waste Log</CardTitle>
          <CardDescription>A real-time log of all waste deposited in the bin.</CardDescription>
        </CardHeader>
        <CardContent>
          <WasteLogTable wasteLog={wasteLog} />
        </CardContent>
      </Card>
    </div>
  );
}
