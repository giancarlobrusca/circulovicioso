import sanityClient from "@sanity/client";
import { createClient } from "next-sanity";

const config = {
  dataset: "production",
  apiVersion: "2021-08-31",
  projectId: "5jmbaa25",
  useCdn: false,
};

const client = createClient(config);

export const postClient = sanityClient({
  ...config,
  apiVersion: "2021-08-31",
  token: process.env.SANITY_TOKEN,
});

export default client;
