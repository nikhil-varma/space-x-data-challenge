import { StatNumber, Tooltip, Box } from "@chakra-ui/core";
import React from "react";
import { getGMTOffset } from "../utils/date-calc";
import {
  formatDateTime,
  formatDateTimeToTargetLocale,
} from "../utils/format-date";

export default function DateTime({ timestamp }) {
  const timeZoneOffset = getGMTOffset(timestamp);
  const targetLocaleDateTime = formatDateTimeToTargetLocale(
    timestamp,
    timeZoneOffset
  );
  const currentLocalDateTime = formatDateTime(timestamp);
  return (
    <StatNumber>
      <Tooltip label={currentLocalDateTime} placement="right">
        <Box as="span">
          {targetLocaleDateTime} GMT{timeZoneOffset}
        </Box>
      </Tooltip>
    </StatNumber>
  );
}
