import { articleQuery } from "./queries";
import { postClient } from "./sanity";
import client from "./sanity";

export async function getWiki() {
  return await client.fetch(articleQuery);
}

export async function requestArticle(data) {
  return await postClient.create({
    ...data,
    _type: "article",
  });
}

export function patchArticle(data) {
  return postClient.patch(data._id).set(data.set).commit();
}
