import configPromise from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";

import { importMap } from "../importMap";

type AdminPageParams = Promise<{
  segments: string[];
}>;

type AdminSearchParams = Promise<{
  [key: string]: string | string[];
}>;

interface AdminPageProps {
  params: AdminPageParams;
  searchParams: AdminSearchParams;
}

export const generateMetadata = ({ params, searchParams }: AdminPageProps) =>
  generatePageMetadata({ config: configPromise, params, searchParams });

export default function AdminPage({ params, searchParams }: AdminPageProps) {
  return RootPage({
    config: configPromise,
    importMap,
    params,
    searchParams,
  });
}
