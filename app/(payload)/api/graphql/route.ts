import configPromise from "@payload-config";
import { GRAPHQL_POST } from "@payloadcms/next/routes";

const graphQLPost = GRAPHQL_POST(configPromise);

export const POST =
  process.env.NODE_ENV === "production"
    ? async () => new Response(null, { status: 404 })
    : graphQLPost;
