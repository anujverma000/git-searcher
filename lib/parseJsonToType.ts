import Repository from "../@types/Repository";

const parseRepositories = (repos): Repository[] => {
  return repos.map((r) => ({
    id: r.id,
    name: r.full_name,
    description: r.description,
    stargazers_count: r.stargazers_count,
    updated_at: r.updated_at,
    license: r?.license?.spdx_id,
    language: r.language,
    url: r.html_url,
    open_issues: r.open_issues,
  }));
};

export default parseRepositories;
