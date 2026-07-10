import configPromise from "@payload-config";
import "@payloadcms/next/css";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";

import { importMap } from "./admin/importMap";

interface PayloadLayoutProps {
  children: React.ReactNode;
}

export default function PayloadLayout({ children }: PayloadLayoutProps) {
  const serverFunction: ServerFunctionClient = async function (args) {
    "use server";

    return handleServerFunctions({
      ...args,
      config: configPromise,
      importMap,
    });
  };

  return (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
