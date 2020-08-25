/**
 * Drawer for Author's introduction
 * Can be accessed from footer of the page.
 */

import {
  Text,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
  Tag,
  TagLabel,
  TagIcon,
  Avatar,
  Stack,
  Box,
} from "@chakra-ui/core";

const About = ({ isOpen, onClose }) => {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody textAlign="center" my={10}>
            <Stack>
              <Avatar
                alignSelf="center"
                size="2xl"
                bg="white"
                borderWidth="6px"
                name="Anuj Verma"
                src="https://www.gravatar.com/avatar/4686f7a2e6a6153731a5555106a38d26.jpg?s=320"
              />
              <Text mt={1} fontSize="xl" fontWeight="semibold">
                Anuj Verma
              </Text>
              <Link
                href="mailto:anujverma000@gmail.com"
                color="gray.400"
                fontSize="sm"
              >
                <Text>anujverma000@gmail.com</Text>
              </Link>
              <Link href="tel:+971522545359" color="gray.400" fontSize="sm">
                <Text>Ph: +971 522545359</Text>
              </Link>
              <Box w="50%" alignSelf="center" color="gray.700">
                <Text my={6}>
                  Detailed oriented and self motivated software professional
                  with over 12 years experience in analysis, design and
                  development.
                </Text>
                <Text my={6}>
                  Passionate for result-oriented approach with a focus on
                  quality and user experience.
                </Text>
                <Text my={6}>
                  Product design, architect and leading development with focus
                  on tracking, AB testing, SEO and AdOPs are some of the areas
                  of expertise.
                </Text>
              </Box>
              <Link href="https://anujverma.netlify.app/AnujVerma.pdf">
                <Tag variantColor="cyan">
                  <TagLabel>Hire Me</TagLabel>
                  <TagIcon icon="arrow-down" size="12px" />
                </Tag>
              </Link>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default About;
