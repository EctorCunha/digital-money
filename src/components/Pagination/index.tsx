import { Box, Stack, StackProps, Text } from "@chakra-ui/react";
import React from "react";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  paginationStyle?: StackProps;
}

const siblingsCount = 1;

function geratePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

export default function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
  paginationStyle,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);
  const previousPage =
    currentPage > 1
      ? geratePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPage =
    currentPage < lastPage
      ? geratePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      spacing={6}
      mt="4"
      justify={"space-between"}
      align={"center"}
      {...paginationStyle}
    >
      <Box>
        <strong>{(currentPage - 1) * registersPerPage}</strong> -{" "}
        <strong>
          {Math.min(currentPage * registersPerPage, totalCountOfRegisters)}
        </strong>{" "}
        de <strong>{totalCountOfRegisters} registros</strong>
      </Box>
      <Stack direction={"row"} spacing={2}>
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" width="8" textAlign={"center"}>
                ...
              </Text>
            )}
            {}
          </>
        )}
        {previousPage.length > 0 &&
          previousPage.map((page) => (
            <PaginationItem
              key={page}
              number={page}
              onPageChange={onPageChange}
            />
          ))}
        <PaginationItem
          number={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />
        {nextPage.length > 0 &&
          nextPage.map((page) => (
            <PaginationItem
              key={page}
              number={page}
              onPageChange={onPageChange}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" width="8" textAlign={"center"}>
                ...
              </Text>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
}
