export type WasteType = "plastic" | "organic" | "metal" | "paper";

export interface WasteEntry {
  id: string;
  type: WasteType;
  weight: number; // in kg
  timestamp: Date;
}

export interface BinStatus {
  totalWeight: number; // in kg
  capacity: number; // percentage
  status: "Fill" | "Empty" | "In Use";
  maxCapacity: number; // in kg
}
