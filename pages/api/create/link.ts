import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(401).end();
  }
  const { id, link } = req.body;
  const isHave = await client.link.findFirst({
    where: {
      id,
    },
  });
  if (isHave?.id) {
    return res.json({ error: "already have" });
  } else {
    const createdLink = await client.link.create({
      data: {
        id,
        link,
      },
    });
    return res.json(createdLink);
  }
}
