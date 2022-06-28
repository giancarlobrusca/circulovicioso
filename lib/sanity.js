const { createClient } = require("next-sanity");

const config = {
  dataset: "production",
  projectId: "5jmbaa25",
};

const client = createClient(config);

export default client;
