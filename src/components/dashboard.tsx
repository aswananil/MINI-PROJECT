"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "@/components/dashboard/overview-tab";
import CarbonEstimatorTab from "@/components/dashboard/carbon-estimator-tab";
import InstructionsTab from "@/components/dashboard/instructions-tab";
import { useState, useEffect } from "react";
import type { WasteEntry, BinStatus } from "@/lib/types";
import { initialWasteLog, generateNewWasteEntry, calculateBinStatus } from "@/lib/mock-data";

export default function Dashboard() {
  const [wasteLog, setWasteLog] = useState<WasteEntry[]>(initialWasteLog);
  const [binStatus, setBinStatus] = useState<BinStatus>(calculateBinStatus(initialWasteLog));

  useEffect(() => {
    const interval = setInterval(() => {
      setWasteLog((prevLog) => {
        const newEntry = generateNewWasteEntry(prevLog);
        const newLog = [newEntry, ...prevLog];
        setBinStatus(calculateBinStatus(newLog));
        return newLog;
      });
    }, 10000); // Add new data every 10 seconds to simulate real-time updates

    return () => clearInterval(interval);
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
