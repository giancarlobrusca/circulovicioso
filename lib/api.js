import { articleQuery } from "./queries";
import client from "./sanity";

export async function getWiki() {
  return await client.fetch(articleQuery);
}
