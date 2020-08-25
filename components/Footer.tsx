/**
 * Footer of the app
 */

import { Flex, Text, Stack, useDisclosure } from "@chakra-ui/core";
import About from "./About";

const Footer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        as="footer"
        fontSize="sm"
        justify="center"
        textAlign="center"
        borderTopColor="gray.200"
        borderTopWidth="1px"
        width="100%"
        py={2}
        mt={4}
      >
        <Stack>
          <Text py={2} color="gray.700">
            Proudly made by{" "}
            <Text as="u" onClick={onOpen} cursor="pointer">
              Anuj Verma
            </Text>
          </Text>
          <Text fontSize="xs" color="gray.500">
            Released under the MIT License.
          </Text>
          <Text fontSize="xs" color="gray.500">
            Copyright © 2020
          </Text>
        </Stack>
      </Flex>
      <About {...{ isOpen, onClose }} />
    </>
  );
};

export default Footer;
