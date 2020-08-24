import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "@octokit/rest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  });

  const result = await octokit.request(
    `/search/${req.query.t}?q=${req.query.q}`
  );
  res.status(200).json(result.data);
};
