import { patchArticle } from "../../lib/api";

export default async function post(req, res) {
  const { body } = req;

  try {
    const article = await patchArticle(body);

    return res.status(200).json({ status: "success", article });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
