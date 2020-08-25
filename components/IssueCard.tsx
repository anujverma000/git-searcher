/**
 * Component for rendering issues from search results
 */

import {
  PseudoBox,
  Flex,
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
      <Flex mb={2} color="green.500" alignItems="center">
        <GoGitPullRequest />
        <Link href={issue.pr_url} isExternal color="gray.500" isTruncated>
          <Text ml={1} fontSize={["sm", "md"]} isTruncated>
            {issue.pr_url}
          </Text>
        </Link>
      </Flex>
      <Link href={issue.url} isExternal color="#0366d6">
        <Text fontSize={["sm", "md"]} fontWeight="semibold">
          {issue.title}
        </Text>
      </Link>
      <Flex my={2} color="gray.500" alignItems="center">
        <GoRepo />
        <Text ml={1} fontSize={["sm", "md"]}>
          {issue.repo_url?.replace("https://api.github.com/repos/", "")}
        </Text>
      </Flex>
      <Stack my={4} spacing={4} isInline alignItems="center">
        <Text fontSize={["md", "sm"]} color="gray.500">
          Updated at {timeAgo.format(Date.parse(issue?.updated_at))}
        </Text>
        <Text
          fontSize={["md", "sm"]}
          color="gray.500"
          display={["none", "block"]}
        >
          Created: {timeAgo.format(Date.parse(issue?.created_at))}
        </Text>
        <Flex alignItems="center" fontSize={["md", "sm"]} color="gray.500">
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
          <Avatar size="xs" name={issue.user?.name} src={issue.user?.avatar} />
          <Text fontSize={["sm", "md"]}>{issue.user?.name}</Text>
        </Stack>
      </Link>
    </PseudoBox>
  );
};

export default IssueCard;
