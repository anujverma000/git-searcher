/**
 * Github api returns a lot of data, and it will not be wise to save
 * all the data in persistent store.
 *
 * So, We have some types those help us to parse the data in required format and
 * save the required data only.
 */

/**
 * Type for Respository
 */
export type Repository = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
  license: string;
  language: string;
  url: string;
  open_issues: number;
};

/**
 * Type for User
 */
export type User = {
  id: number;
  name: string;
  avatar: string;
  url: string;
};

/**
 * Type for Issue
 */
export type Issue = {
  id: number;
  title: string;
  body: string;
  url: string;
  comments: number;
  closed: boolean;
  locked: boolean;
  created_at: string;
  updated_at: string;
  user: User;
  repo_url: string;
  pr_url: string;
  labels: Label[];
};

/**
 * Issues may have a list of labels as well.
 *
 * Type fopr issues labels
 */
export type Label = {
  id: number;
  name: string;
  description: string;
};

/**
 * Type for Result, which may of the either type of Repository, User or Issue.
 */
export type Result = Repository | User | Issue;
