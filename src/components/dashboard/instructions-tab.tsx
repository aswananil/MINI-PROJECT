import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Recycle, Leaf, FileText, Wrench, LayoutDashboard } from "lucide-react";
import { MetalCanIcon } from "@/components/icons";

export default function InstructionsTab() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>EcoSort Instructions</CardTitle>
        <CardDescription>Learn how to use and maintain your smart bin for optimal performance and longevity.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2 font-semibold text-lg">
                <Recycle className="h-5 w-5 text-primary" /> How to Sort Your Waste
              </h3>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 pl-8 text-muted-foreground">
              <p className="flex items-center gap-3"><Leaf className="h-5 w-5 text-green-600 flex-shrink-0" /> <strong>Organic:</strong> Food scraps, yard trimmings, and other compostable materials.</p>
              <p className="flex items-center gap-3"><FileText className="h-5 w-5 text-yellow-600 flex-shrink-0" /> <strong>Paper:</strong> Clean paper, cardboard, newspapers, and magazines.</p>
              <p className="flex items-center gap-3"><Recycle className="h-5 w-5 text-blue-600 flex-shrink-0" /> <strong>Plastic:</strong> Bottles, containers, and other plastic items. Please rinse before depositing.</p>
              <p className="flex items-center gap-3"><MetalCanIcon className="h-5 w-5 text-gray-600 flex-shrink-0" /> <strong>Metal:</strong> Aluminum cans, steel cans, and other metal objects.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2 font-semibold text-lg">
                <Wrench className="h-5 w-5 text-primary" /> Maintenance Requirements
              </h3>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-2 pl-8 text-muted-foreground">
              <p><strong>Weekly:</strong> Wipe the interior and exterior of the bin with a damp cloth and mild soap.</p>
              <p><strong>Monthly:</strong> Check the sensors for any debris and clean them gently with a dry cloth.</p>
              <p><strong>Quarterly:</strong> Empty the compost tea collector if your model has one.</p>
              <p><strong>Annually:</strong> Check the battery health and replace if necessary. Refer to the user manual for battery specifications.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2 font-semibold text-lg">
                <LayoutDashboard className="h-5 w-5 text-primary" /> Understanding the Dashboard
              </h3>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-2 pl-8 text-muted-foreground">
                <p><strong>Total Waste Collected:</strong> Shows the total weight of waste currently in the bin.</p>
                <p><strong>Bin Fill Level:</strong> A visual representation of how full the bin is.</p>
                <p><strong>Bin Status:</strong> Indicates if the bin is "Empty" (under 20% full), "In Use" (20-80% full), or "Fill" (over 80% full).</p>
                <p><strong>Waste Log:</strong> A detailed, real-time history of all items deposited into the bin.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
