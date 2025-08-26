"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "@/components/dashboard/overview-tab";
import CarbonEstimatorTab from "@/components/dashboard/carbon-estimator-tab";
import InstructionsTab from "@/components/dashboard/instructions-tab";
import { useState, useEffect } from "react";
import type { WasteEntry, BinStatus } from "@/lib/types";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";

const MAX_CAPACITY_KG = 50;

const calculateBinStatus = (log: WasteEntry[]): BinStatus => {
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

export default function Dashboard() {
  const [wasteLog, setWasteLog] = useState<WasteEntry[]>([]);
  const [binStatus, setBinStatus] = useState<BinStatus>(calculateBinStatus([]));

  useEffect(() => {
    const q = query(collection(db, "wasteLog"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newLog: WasteEntry[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newLog.push({
          id: doc.id,
          type: data.type,
          weight: data.weight,
          timestamp: (data.timestamp as Timestamp).toDate(),
        });
      });
      setWasteLog(newLog);
      setBinStatus(calculateBinStatus(newLog));
    });

    return () => unsubscribe();
  }, []);

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
        <TabsTrigger value="overview">Dashboard</TabsTrigger>
        <TabsTrigger value="carbon-estimator">Carbon Estimator</TabsTrigger>
        <TabsTrigger value="instructions">Instructions</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <OverviewTab wasteLog={wasteLog} binStatus={binStatus} />
      </TabsContent>
      <TabsContent value="carbon-estimator">
        <CarbonEstimatorTab wasteLog={wasteLog} />
      </TabsContent>
      <TabsContent value="instructions">
        <InstructionsTab />
      </TabsContent>
    </Tabs>
  );
}
