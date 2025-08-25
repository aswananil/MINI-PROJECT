import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Percent } from "lucide-react";
import type { BinStatus } from "@/lib/types";
import CircularProgressChart from "@/components/dashboard/circular-progress-chart";

interface StatusCardsProps {
  binStatus: BinStatus;
}

export default function StatusCards({ binStatus }: StatusCardsProps) {
  const getStatusVariant = (status: BinStatus["status"]) => {
    switch (status) {
      case "Fill":
        return "destructive";
      case "Empty":
        return "default";
      case "In Use":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Waste Collected</CardTitle>
          <Trash2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{binStatus.totalWeight} kg</div>
          <CardDescription>Total waste since last empty</CardDescription>
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bin Fill Level</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center pt-2">
          <CircularProgressChart value={binStatus.capacity} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bin Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant={getStatusVariant(binStatus.status)} className="text-lg py-1 px-3">
            {binStatus.status}
          </Badge>
          <CardDescription className="mt-2">
            {binStatus.status === 'Fill' && 'Bin is almost full. Please empty soon.'}
            {binStatus.status === 'Empty' && 'Bin is mostly empty and ready for use.'}
            {binStatus.status === 'In Use' && 'Bin is in normal operation.'}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
