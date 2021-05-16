import React from "react";
import { Button } from "@chakra-ui/core";
import { Star } from "react-feather";

export default function FavouriteButton({ isFavourite, onClick, ...props }) {
  return (
    <Button
      variant="outline"
      boxShadow="none !important"
      borderRadius="50%"
      bg="#EDF2F7"
      _hover={{
        background: "white",
      }}
      p={2}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick();
      }}
      {...props}
    >
      <Star width="18" stroke="green" fill={isFavourite ? "green" : "none"} />
    </Button>
  );
}
