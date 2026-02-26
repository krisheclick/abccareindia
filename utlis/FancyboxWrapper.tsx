"use client";

import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function FancyboxWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});

    return () => Fancybox.destroy();
  }, []);

  return <>{children}</>;
}
