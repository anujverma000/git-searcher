import { Repository, User, Issue, Label } from "../@types/ResultTypes";

/**
 * Parses repository search results to type defined as `Repository`
 * @param repos Repository search results
 */
export const parseRepositories = (repos: any[]): Repository[] => {
  return repos.map(
    (r): Repository => ({
      id: r.id,
      name: r.full_name,
      description: r.description,
      stargazers_count: r.stargazers_count,
      updated_at: r.updated_at,
      license: r?.license?.spdx_id,
      language: r.language,
      url: r.html_url,
      open_issues: r.open_issues,
    })
  );
};

/**
 * Parses users search results to type defined as `User`
 * @param users Users search results
 */
export const parseUsers = (users: any[]): User[] => {
  return users.map(
    (u): User => ({
      id: u.id,
      name: u.login,
      avatar: u.avatar_url,
      url: u.html_url,
    })
  );
};

/**
 * Parses issues search results to type defined as `Issue`
 * @param issues Issues search results
 */
export const parseIssues = (issues: any[]): Issue[] => {
  return issues.map(
    (i): Issue => ({
      id: i.id,
      title: i.title,
      body: i.body,
      url: i.url,
      comments: i.comments,
      closed: Boolean(i.state === "closed"),
      locked: Boolean(i.locked),
      user: {
        id: i.user.id,
        name: i.user.login,
        avatar: i.user.avatar_url,
        url: i.user.html_url,
      },
      repo_url: i.repository_url,
      pr_url: i.html_url,
      created_at: i.created_at,
      updated_at: i.updated_at,
      labels: i.labels.map(
        (l): Label => ({
          id: l.id,
          name: l.name,
          description: l.description,
        })
      ),
    })
  );
};
