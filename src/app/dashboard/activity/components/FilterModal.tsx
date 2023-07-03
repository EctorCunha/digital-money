import { DefaultButton } from "@/components/Button";
import { ModalDefault, ModalDefaultProps } from "@/components/Modal";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  HStack,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface FilterModalProps extends ModalDefaultProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export type FilterOptions =
  | "today"
  | "yesterday"
  | "lastWeek"
  | "lastFifthDays"
  | "lastMonth"
  | "lastYear";

export default function FilterModal({
  filter,
  setFilter,
  ...props
}: FilterModalProps) {
  const [filterByDate, setFilterByDate] = useState<string>("");

  const onClickFilter = () => {
    setFilter(filterByDate);
    props.onClose();
  };

  return (
    <ModalDefault {...props} size={"sm"}>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem border="0px">
          {({ isExpanded }) => (
            <>
              <AccordionButton maxW={"200px"} w="100%">
                <HStack spacing={2} as="span" flex={1} textAlign="left">
                  <Text color="#201F22" fontSize="1rem" fontWeight={700}>
                    Período
                  </Text>
                  <MdKeyboardArrowDown />
                </HStack>
              </AccordionButton>
              <AccordionPanel>
                <RadioGroup onChange={setFilterByDate} value={filterByDate}>
                  <VStack align="flex-start" spacing={4}>
                    <Radio value="today">Hoje</Radio>
                    <Radio value="yesterday">Ontem</Radio>
                    <Radio value="lastWeek">Última semana</Radio>
                    <Radio value="lastFifthDays">Últimos 15 dias</Radio>
                    <Radio value="lastMonth">Último mês</Radio>
                    <Radio value="lastYear">Último ano</Radio>
                  </VStack>
                </RadioGroup>
              </AccordionPanel>

              <DefaultButton
                display={isExpanded ? "block" : "none"}
                label="Aplicar"
                h="37px !important"
                w="100%"
                onClick={onClickFilter}
              />
            </>
          )}
        </AccordionItem>
      </Accordion>

      <Text
        color={"rgba(0, 0, 0, 0.5)"}
        fontSize={"1rem"}
        onClick={() => {
          setFilterByDate("");
        }}
        cursor={"pointer"}
        pt="8px"
        position={"absolute"}
        right="20px"
        top="25px"
      >
        Limpar Filtros
      </Text>
    </ModalDefault>
  );
}
