import { Circle, Flex, HStack, Radio, StackProps, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Card } from "@/query/use-get-cards";

interface CardProps extends StackProps {
  card: Card;
}

const Card = (props: CardProps) => {
  const { card } = props;

  return (
    <HStack w="100%">
      <Flex w="full" gap={"1.1rem"} justifyContent={"space-between"}>
        <HStack w="full">
          <Circle size="2rem" bg="#C1FD35" />

          <Text fontWeight="400" fontSize="16px" lineHeight="22px" color="#000000">{`Final ${String(card.number_id).slice(-4)}`}</Text>
        </HStack>

        <Radio id={String(card.id)} value={String(card.number_id)} />
      </Flex>
    </HStack>
  );
};

export default Card;
