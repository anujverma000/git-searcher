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
    log: {
      debug: console.debug,
      info: console.info,
      warn: console.warn,
      error: console.error,
    },
  });
  const type = encodeURI(String(req.query.t).trim());
  const query = encodeURI(String(req.query.q).trim());
  console.log(type, query);
  octokit
    .request(`/search/${type.trim()}?q=${query}`)
    .then((result) => res.status(200).json(result.data))
    .catch(() => res.status(500).json({ message: "Internal Server Error" }));
};
