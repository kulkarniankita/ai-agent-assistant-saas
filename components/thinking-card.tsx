import { Card, CardContent } from "./ui/card";
import { BrainIcon } from "lucide-react";

export default function ThinkingCard() {
  return (
    <div className="flex justify-start">
      <Card className="max-w-[80%] bg-muted">
        <CardContent className="p-4 flex items-center gap-2">
          <BrainIcon className="h-5 w-5" />
          <p>Thinking...</p>
        </CardContent>
      </Card>
    </div>
  );
}
