const { createClient } = require("next-sanity");

const config = {
  dataset: "production",
  apiVersion: "2021-08-31",
  projectId: "5jmbaa25",
  useCdn: true,
};

const client = createClient(config);

export default client;
