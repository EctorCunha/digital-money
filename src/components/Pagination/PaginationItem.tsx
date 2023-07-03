import { Button } from "@chakra-ui/react";
import React from "react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange?: (page: number) => void;
}

export default function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        disabled
        _disabled={{
          bgColor: "#EEEAEA",
          cursor: "default",
        }}
        _hover={{ bg: "#eeeaeaf2" }}
      >
        {number}
      </Button>
    );
  }
  return (
    <Button
      size="sm"
      fontSize="xs"
      bgColor="transparent"
      onClick={() => onPageChange!(number)}
    >
      {number}
    </Button>
  );
}
