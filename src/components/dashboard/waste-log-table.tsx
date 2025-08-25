import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { WasteEntry, WasteType } from "@/lib/types";
import { Recycle, Leaf, FileText } from "lucide-react";
import { MetalCanIcon } from "@/components/icons";

interface WasteLogTableProps {
  wasteLog: WasteEntry[];
}

const WasteTypeIcon = ({ type }: { type: WasteType }) => {
  const iconProps = { className: "h-4 w-4 mr-2" };
  switch (type) {
    case "plastic":
      return <Recycle {...iconProps} style={{ color: "hsl(217, 89%, 61%)" }} />;
    case "organic":
      return <Leaf {...iconProps} style={{ color: "hsl(142, 71%, 45%)" }}/>;
    case "metal":
      return <MetalCanIcon {...iconProps} style={{ color: "hsl(215, 14%, 34%)" }}/>;
    case "paper":
      return <FileText {...iconProps} style={{ color: "hsl(48, 96%, 58%)" }}/>;
    default:
      return null;
  }
};

export default function WasteLogTable({ wasteLog }: WasteLogTableProps) {
  return (
    <div className="max-h-[400px] overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Waste Type</TableHead>
            <TableHead className="text-right">Weight (kg)</TableHead>
            <TableHead className="text-right">Date & Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wasteLog.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">No waste logged yet.</TableCell>
            </TableRow>
          ) : (
            wasteLog.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    <WasteTypeIcon type={entry.type} />
                    {entry.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">{entry.weight.toFixed(2)}</TableCell>
                <TableCell className="text-right text-muted-foreground">{entry.timestamp.toLocaleString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
