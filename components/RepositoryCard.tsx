/**
 * Component for rendering resositories from search results
 */

import { Flex, Text, Link, PseudoBox } from "@chakra-ui/core";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { GoRepo, GoStar } from "react-icons/go";
import numberFormatter from "../lib/numberFormatter";
import { Repository } from "../@types/ResultTypes";

const RepositoryCard: React.FC<Repository> = (repo: Repository) => {
  /**
   * Used to parse string time to time ago format
   */
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  return (
    <PseudoBox
      p={4}
      borderWidth="1px"
      rounded="lg"
      _hover={{ borderColor: "gray.400" }}
    >
      <Flex align="flex-start">
        <PseudoBox mt={1}>
          <GoRepo size="16px" />
        </PseudoBox>
        <Link href={repo.url} isExternal color="#0366d6">
          <Text fontSize={["sm", "md"]} ml={2} fontWeight="semibold">
            {repo.name}
          </Text>
        </Link>
      </Flex>
      <Text fontSize="xs" color="gray.500">
        Updated: {timeAgo.format(Date.parse(repo?.updated_at))}
      </Text>
      <Text fontSize="sm" mt={2} isTruncated>
        {repo.description}
      </Text>
      <Flex align="center" mt={2} color="gray.500">
        <GoStar />{" "}
        <Text fontSize="xs" ml={1} color="gray.500">
          {numberFormatter(repo.stargazers_count)}
        </Text>
        <Text fontSize="xs" ml={4} color="gray.500">
          {repo?.language}
        </Text>
        <Text fontSize="xs" ml={4} color="gray.500">
          {repo?.license}
        </Text>
      </Flex>
    </PseudoBox>
  );
};

export default RepositoryCard;
