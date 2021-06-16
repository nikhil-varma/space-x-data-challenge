import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
  Button,
  SimpleGrid,
  DrawerFooter,
  Box,
} from "@chakra-ui/core";
import { List } from "react-feather";
import { LaunchItem } from "./launches";
import { LaunchPadItem } from "./launch-pads";
import StorageContext from "../providers/storage-context";

function NoItemsMessage({ items }) {
  return (
    <>
      {!items.length ? (
        <Box height="50px">
          <Text
            color="gray.500"
            fontSize={["md", null, "lg"]}
            my="8"
            textAlign="center"
          >
            No favourite items added
          </Text>
        </Box>
      ) : null}
    </>
  );
}

export function FavouritesDrawer() {
  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        ref={btnRef}
        variant="link"
        color="white"
        boxShadow="none !important"
        onClick={onOpen}
      >
        <List width="16" />{" "}
        <Text ml={2} textTransform="uppercase" letterSpacing={1} fontSize={14}>
          {" "}
          favourites
        </Text>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent overflowY="scroll" overflowX="hidden">
          <DrawerCloseButton />
          <DrawerHeader>Favourite Launches and Launch pads</DrawerHeader>
          <DrawerBody>
            <StorageContext.Consumer>
              {(context) => (
                <>
                  <SimpleGrid spacing="4">
                    <Text fontWeight="bold" fontSize="20px">
                      Launches ({context.launches.length})
                    </Text>
                    {context.launches.map((item) => (
                      <LaunchItem launch={item} key={item.flight_number} />
                    ))}
                    <NoItemsMessage items={context.launches} />
                  </SimpleGrid>
                  <SimpleGrid spacing="4" mt="8">
                    <Text fontWeight="bold" fontSize="20px">
                      Launch Pads ({context.launchPads.length})
                    </Text>
                    {context.launchPads.map((item) => (
                      <LaunchPadItem launchPad={item} key={item.id} />
                    ))}
                    <NoItemsMessage items={context.launchPads} />
                  </SimpleGrid>
                </>
              )}
            </StorageContext.Consumer>
          </DrawerBody>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </>
  );
}
