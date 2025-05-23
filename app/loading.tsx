import { Loader2 } from "lucide-react";
import React from "react";

export default function loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center gap-2">
        <Loader2 className="animate-spin" />
        <p>Loading...</p>
      </div>
    </div>
  );
}
