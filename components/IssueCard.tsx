/**
 * Component for rendering issues from search results
 */

import {
  PseudoBox,
  Flex,
  Box,
  Link,
  Text,
  Stack,
  Tag,
  TagLabel,
  Avatar,
} from "@chakra-ui/core";
import { GoGitPullRequest, GoRepo, GoComment } from "react-icons/go";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Issue } from "../@types/ResultTypes";

const IssueCard: React.FC<Issue> = (issue: Issue) => {
  /**
   * Used to parse string time to time ago format
   */
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  return (
    <PseudoBox
      p={4}
      borderBottomWidth="1px"
      _hover={{ borderColor: "gray.400" }}
    >
      <Flex>
        <Box flexGrow={1}>
          <Flex mb={2} color="green.400" alignItems="center" flexWrap="wrap">
            <GoGitPullRequest />
            <Link href={issue.pr_url} isExternal color="gray.400">
              <Text ml={1} fontSize="sm">
                {issue.pr_url}
              </Text>
            </Link>
          </Flex>
          <Link href={issue.url} isExternal color="#0366d6">
            <Text fontSize="md" fontWeight="semibold">
              {issue.title}
            </Text>
          </Link>
          <Flex my={2} color="gray.500" alignItems="center">
            <GoRepo />
            <Text ml={1} fontSize="xs">
              {issue.repo_url?.replace("https://api.github.com/repos/", "")}
            </Text>
          </Flex>
          <Stack my={4} spacing={4} isInline alignItems="center">
            <Text fontSize="xs" color="gray.500">
              Updated at {timeAgo.format(Date.parse(issue?.updated_at))}
            </Text>
            <Text fontSize="xs" color="gray.500">
              Created at {timeAgo.format(Date.parse(issue?.created_at))}
            </Text>
            <Flex alignItems="center" fontSize="xs" color="gray.500">
              <GoComment />
              &nbsp;{issue.comments || 0} Comments
            </Flex>
          </Stack>
          <Stack spacing={4} isInline flexWrap="wrap">
            {issue.labels?.map((label) => (
              <Tag
                size="sm"
                key={label.id}
                rounded="full"
                variant="solid"
                bg="gray.200"
                mb={2}
              >
                <TagLabel fontSize="xs" color="gray.700">
                  {label.name}
                </TagLabel>
              </Tag>
            ))}
          </Stack>
          <Link href={issue.user?.url} isExternal color="#0366d6">
            <Stack mt={4} isInline alignItems="center">
              <Avatar
                size="xs"
                name={issue.user?.name}
                src={issue.user?.avatar}
              />
              <Text fontSize="sm">{issue.user?.name}</Text>
            </Stack>
          </Link>
        </Box>
      </Flex>
    </PseudoBox>
  );
};

export default IssueCard;
