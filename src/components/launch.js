import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { format as timeAgo } from "timeago.js";
import { Watch, MapPin, Navigation, Layers } from "react-feather";
import {
  Flex,
  Heading,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Text,
  Spinner,
  Image,
  Link,
  Stack,
  AspectRatioBox,
  StatGroup,
} from "@chakra-ui/core";

import { useSpaceX } from "../utils/use-space-x";
import { formatDateTime } from "../utils/format-date";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";

export default function Launch() {
  let { launchId } = useParams();
  const { data: launch, error } = useSpaceX(`/launches/${launchId}`);

  if (error) return <Error />;
  if (!launch) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <div>
      <Breadcrumbs
        testIds={["homeLink", "launchesLink", "launchItemLink"]}
        items={[
          { label: "Home", to: "/" },
          { label: "Launches", to: ".." },
          { label: `#${launch.flight_number}` },
        ]}
      />
      <Header launch={launch} />
      <Box m={[3, 6]}>
        <TimeAndLocation launch={launch} />
        <RocketInfo launch={launch} />
        <Text
          color="gray.700"
          fontSize={["md", null, "lg"]}
          my="8"
          data-testid="launchDetails"
        >
          {launch.details}
        </Text>
        <Video launch={launch} />
        <Gallery images={launch.links.flickr_images} />
      </Box>
    </div>
  );
}

export function Header({ launch }) {
  return (
    <Flex
      bgImage={`url(${launch.links.flickr_images[0]})`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      minHeight="30vh"
      position="relative"
      p={[2, 6]}
      alignItems="flex-end"
      justifyContent="space-between"
    >
      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height={["85px", "150px"]}
        objectFit="contain"
        objectPosition="bottom"
        data-testid="launchImageBanner"
      />
      <Heading
        color="white"
        display="inline"
        backgroundColor="#718096b8"
        fontSize={["lg", "5xl"]}
        px="4"
        py="2"
        borderRadius="lg"
        data-testid="launchHeader"
      >
        {launch.mission_name}
      </Heading>
      <Stack isInline spacing="3">
        <Badge
          variantColor="purple"
          fontSize={["xs", "md"]}
          data-testid="launchFlightNumber"
        >
          #{launch.flight_number}
        </Badge>
        <Box as="span">
          {launch.launch_success ? (
            <Badge
              variantColor="green"
              fontSize={["xs", "md"]}
              data-testid="launchStatus"
            >
              Successful
            </Badge>
          ) : (
            <Badge
              variantColor="red"
              fontSize={["xs", "md"]}
              data-testid="launchStatus"
            >
              Failed
            </Badge>
          )}
        </Box>
      </Stack>
    </Flex>
  );
}

export function TimeAndLocation({ launch }) {
  return (
    <SimpleGrid
      columns={[1, 1, 2]}
      borderWidth="1px"
      p="4"
      borderRadius="md"
      data-testid="timeAndLocationComponent"
    >
      <Stat>
        <StatLabel display="flex">
          <Box as={Watch} width="1em" />{" "}
          <Box ml="2" as="span">
            Launch Date
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]} data-testid="launchDate">
          {formatDateTime(launch.launch_date_local)}
        </StatNumber>
        <StatHelpText data-testid="launchDateHelptext">
          {timeAgo(launch.launch_date_utc)}
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel display="flex">
          <Box as={MapPin} width="1em" />{" "}
          <Box ml="2" as="span">
            Launch Site
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]}>
          <Link
            as={RouterLink}
            to={`/launch-pads/${launch.launch_site.site_id}`}
            data-testid="launchSite"
          >
            {launch.launch_site.site_name_long}
          </Link>
        </StatNumber>
        <StatHelpText data-testid="launchSiteName">
          {launch.launch_site.site_name}
        </StatHelpText>
      </Stat>
    </SimpleGrid>
  );
}

export function RocketInfo({ launch }) {
  const cores = launch.rocket.first_stage.cores;

  return (
    <SimpleGrid
      columns={[1, 1, 2]}
      borderWidth="1px"
      mt="4"
      p="4"
      borderRadius="md"
      data-testid="rocketInfoComponent"
    >
      <Stat>
        <StatLabel display="flex">
          <Box as={Navigation} width="1em" />{" "}
          <Box ml="2" as="span">
            Rocket
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]} data-testid="launchRocketName">
          {launch.rocket.rocket_name}
        </StatNumber>
        <StatHelpText>{launch.rocket.rocket_type}</StatHelpText>
      </Stat>
      <StatGroup>
        <Stat>
          <StatLabel display="flex">
            <Box as={Layers} width="1em" />{" "}
            <Box ml="2" as="span">
              First Stage
            </Box>
          </StatLabel>
          <StatNumber fontSize={["md", "xl"]} data-testid="launchFirstStage">
            {cores.map((core) => core.core_serial).join(", ")}
          </StatNumber>
          <StatHelpText data-testid="launchFirstStageStatus">
            {cores.every((core) => core.land_success)
              ? cores.length === 1
                ? "Recovered"
                : "All recovered"
              : "Lost"}
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel display="flex">
            <Box as={Layers} width="1em" />{" "}
            <Box ml="2" as="span">
              Second Stage
            </Box>
          </StatLabel>
          <StatNumber fontSize={["md", "xl"]} data-testid="launchSecondStage">
            Block {launch.rocket.second_stage.block}
          </StatNumber>
          <StatHelpText data-testid="launchPayload">
            Payload:{" "}
            {launch.rocket.second_stage.payloads
              .map((payload) => payload.payload_type)
              .join(", ")}
          </StatHelpText>
        </Stat>
      </StatGroup>
    </SimpleGrid>
  );
}

export function Video({ launch }) {
  return (
    <AspectRatioBox maxH="400px" ratio={1.7}>
      <Box
        as="iframe"
        title={launch.mission_name}
        src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
        allowFullScreen
        data-testid="launchVideo"
      />
    </AspectRatioBox>
  );
}

export function Gallery({ images = [] }) {
  return (
    <SimpleGrid
      my="6"
      minChildWidth="350px"
      spacing="4"
      data-testid="launchImageGallery"
    >
      {images.map((image) => (
        <a href={image} key={image}>
          <Image src={image.replace("_o.jpg", "_z.jpg")} />
        </a>
      ))}
    </SimpleGrid>
  );
}
