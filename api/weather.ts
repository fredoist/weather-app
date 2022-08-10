import type { VercelApiHandler } from '@vercel/node'
import fetch from "node-fetch";

const ApiHost = "weatherapi-com.p.rapidapi.com";
const ApiKey = process.env.API_KEY as string;

const handler: VercelApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end("Method not allowed");
    return;
  }

  const { q } = req.query;
  if (!q) {
    res.status(400).end("Query parameter is required");
    return;
  }

  try {
    const data = await fetch(`https://${ApiHost}/current.json?q=${q}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-HOST": ApiHost,
        "X-RapidAPI-Key": ApiKey,
      },
    }).then((r) => r.json());
    res.status(200).json(data);
    return;
  } catch (error) {
    console.log("Error while fetching weather data: ", error);
    res.status(500).json({ error: error.message });
  }
};

export default handler;
