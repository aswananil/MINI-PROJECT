import type { WasteEntry, BinStatus, WasteType } from "@/lib/types";

const wasteTypes: WasteType[] = ["plastic", "organic", "metal", "paper"];

export const initialWasteLog: WasteEntry[] = [
  { id: '1', type: 'plastic', weight: 1.2, timestamp: new Date('2024-07-20T10:00:00Z') },
  { id: '2', type: 'organic', weight: 2.5, timestamp: new Date('2024-07-20T12:30:00Z') },
  { id: '3', type: 'paper', weight: 0.8, timestamp: new Date('2024-07-21T08:15:00Z') },
  { id: '4', type: 'metal', weight: 0.5, timestamp: new Date('2024-07-21T14:00:00Z') },
  { id: '5', type: 'plastic', weight: 1.5, timestamp: new Date('2024-07-22T09:45:00Z') },
];

const MAX_CAPACITY_KG = 50;

export const calculateBinStatus = (log: WasteEntry[]): BinStatus => {
  const totalWeight = log.reduce((sum, entry) => sum + entry.weight, 0);
  const capacity = Math.min(100, (totalWeight / MAX_CAPACITY_KG) * 100);
  let status: "Fill" | "Empty" | "In Use";
  if (capacity > 80) {
    status = "Fill";
  } else if (capacity < 20) {
    status = "Empty";
  } else {
    status = "In Use";
  }

  return {
    totalWeight: parseFloat(totalWeight.toFixed(2)),
    capacity: parseFloat(capacity.toFixed(2)),
    status,
    maxCapacity: MAX_CAPACITY_KG,
  };
};

export const initialBinStatus = calculateBinStatus(initialWasteLog);

export const generateNewWasteEntry = (currentLog: WasteEntry[]): WasteEntry => {
  const newId = (currentLog.length + 1).toString();
  const type = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
  const weight = parseFloat((Math.random() * 2 + 0.1).toFixed(2));
  return {
    id: newId,
    type,
    weight,
    timestamp: new Date(),
  };
};
