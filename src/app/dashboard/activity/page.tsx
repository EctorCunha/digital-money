"use client";
import { DefaultButton } from "@/components/Button";
import FieldInput from "@/components/FieldInput";
import { Template } from "@/components/Template";
import { TemplateGrid } from "@/components/Template/TemplateGrid";
import { HStack, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { FilterIcon } from "./components/FilterIcon";
import { useSession } from "next-auth/react";
import { Activity, useGetActivity } from "@/query/use-get-activity";
import { useCallback, useMemo, useState } from "react";
import { chunk, filter, orderBy } from "lodash";
import { RecentActivity } from "../home/components/RecentActivity";
import Pagination from "@/components/Pagination";
import FilterModal from "./components/FilterModal";
import { isBefore, isSameDay, parseISO, subDays } from "date-fns";

export default function ActivityPage() {
  const { data: session } = useSession();

  const { data } = useGetActivity({
    account_id: session?.user?.user_info?.id ?? 0,
  });

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [modalFilter, setModalFilter] = useState(false);

  const [filterByDate, setFilterByDate] = useState<string>("lastYear");

  const filterByDateOptions = useCallback(
    (data: Activity[]) => {
      if (!data) return [];

      if (!filterByDate) return data;

      if (filterByDate === "today") {
        return data.filter((activity) => {
          return isSameDay(parseISO(activity.dated), new Date());
        });
      } else if (filterByDate === "yesterday") {
        return data.filter((activity) =>
          isSameDay(parseISO(activity.dated), subDays(new Date(), 1))
        );
      } else if (filterByDate === "lastWeek") {
        return data.filter((activity) =>
          isBefore(
            subDays(parseISO(activity.dated), 7),
            parseISO(activity.dated)
          )
        );
      } else if (filterByDate === "lastFifthDays") {
        return data.filter((activity) =>
          isBefore(
            subDays(parseISO(activity.dated), 15),
            parseISO(activity.dated)
          )
        );
      } else if (filterByDate === "lastMonth") {
        return data.filter((activity) =>
          isBefore(
            subDays(parseISO(activity.dated), 30),
            parseISO(activity.dated)
          )
        );
      } else if (filterByDate === "lastYear") {
        return data.filter((activity) =>
          isBefore(
            subDays(parseISO(activity.dated), 365),
            parseISO(activity.dated)
          )
        );
      }
    },
    [filterByDate]
  );

  const dataFormattedPages = useMemo(() => {
    if (!data) return [];

    if (filterByDate) {
      return search
        ? chunk(
            filter(filterByDateOptions(data), (activity) =>
              activity.description.includes(search)
            ),
            4
          )
        : chunk(orderBy(filterByDateOptions(data), "dated", "desc"), 10);
    }

    return search
      ? chunk(
          filter(data, (activity) => activity.description.includes(search)),
          4
        )
      : chunk(orderBy(data, "dated", "desc").reverse(), 10);
  }, [data, filterByDate, filterByDateOptions, search]);

  return (
    <Template shouldShowUser variant="secondary">
      <TemplateGrid>
        <VStack
          p={{
            base: "20px 20px 42px 20px",
            sm: "68px 52px 85px 50px",
            lg: "40px 79px 42px 79px",
          }}
          spacing={"20px"}
          w="100%"
          align={"flex-start"}
          maxH={"calc(100vh - 128px)"}
          h="100%"
          overflow={"auto"}
        >
          <HStack spacing={"20px"} w="100%" justifyContent={"space-between"}>
            <InputGroup>
              <InputLeftElement h="full">
                <AiOutlineSearch />
              </InputLeftElement>
              <FieldInput
                background={"#FFFF !important"}
                border="1px solid #D2FFEC"
                name="search"
                placeholder="Pesquisar em 'Minha atividade'"
                _focus={{ boxShadow: "none", outline: "none" }}
                _placeholder={{
                  color: "rgba(0, 0, 0, 0.5)",
                }}
                fontWeight={"400"}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                pl="35px"
              />
            </InputGroup>

            <DefaultButton
              onClick={() => setModalFilter(true)}
              w={"172px"}
              maxW={"172px"}
              rightIcon={<FilterIcon />}
              iconSpacing={"30px"}
              label={"Filtrar"}
              display={{ base: "none", sm: "flex" }}
            />

            <FilterModal
              isOpen={modalFilter}
              onClose={() => setModalFilter(false)}
              filter={filterByDate}
              setFilter={setFilterByDate}
            />
          </HStack>

          <RecentActivity
            hasPagination={
              <Pagination
                paginationStyle={{
                  marginTop: "2rem",
                }}
                registersPerPage={10}
                totalCountOfRegisters={dataFormattedPages.reduce(
                  (total, array) => total + array.length,
                  0
                )}
                currentPage={page}
                onPageChange={setPage}
              />
            }
            activity={dataFormattedPages[page - 1]}
          />
        </VStack>
      </TemplateGrid>
    </Template>
  );
}
