import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "@octokit/rest"; // helper lib to manage ajax calls server side

/**
 * Async search method to access github apis from server side.
 * Request format is : /search?t=<type>&q={query}
 *  e.g. /search?t=users&q=anuj
 *
 *  Possible types are users, repositories, issues.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  });

  const result = await octokit.request(
    `/search/${req.query.t}?q=${req.query.q}`
  );
  res.status(200).json(result.data);
};
