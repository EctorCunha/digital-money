"use client";
import { Grid, GridItem, GridProps } from "@chakra-ui/react";
import { SideBar } from "../SideBar";
interface TemplateGridProps extends GridProps {
  children: React.ReactNode;
}

export const TemplateGrid = ({ children }: TemplateGridProps) => {
  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", md: "221px 1fr", lg: "276px 1fr" }}
      h="calc(100vh - 128px)"
    >
      <GridItem display={{ base: "none", md: "grid" }} h={"100%"}>
        <SideBar />
      </GridItem>

      <GridItem bg="gray.100" w="100%">
        {children}
      </GridItem>
    </Grid>
  );
};
