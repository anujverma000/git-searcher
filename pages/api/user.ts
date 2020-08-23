import { NextApiRequest, NextApiResponse } from 'next'
import {Octokit} from '@octokit/rest';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN
  })

  const result = await octokit.request(`/users/${req.query.q}`)
  console.log(result);
}