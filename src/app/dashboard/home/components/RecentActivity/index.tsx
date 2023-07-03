"use client";
import { Divider, Flex, Text } from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { ActivityInfo } from "../ActivityInfo";
import { Activity } from "@/query/use-get-activity";

interface RecentActivityProps {
  activity: Activity[] | undefined;
  hasPagination?: React.ReactNode;
  seeActivities?: boolean;
}

export const RecentActivity = ({ activity, hasPagination, seeActivities }: RecentActivityProps) => {
  const router = useRouter();

  return (
    <Flex
      background="#FFF"
      p={{
        base: "15px 23px 23px 22px",
        sm: "16px 19px 47px 27px",
        md: "32px 60px 47px 25px",
      }}
      flexDir={"column"}
      borderRadius={"8px"}
      w="100%"
    >
      <Text
        color="#201F22"
        fontWeight="700"
        fontSize="16px"
        lineHeight="22px"
        py={"2rem"}
      >
        Minha atividade
      </Text>

      <Divider borderBottomColor={"blackAlpha.600"} />

      {activity?.map((activity, index) => {
        return <ActivityInfo key={activity.id} activity={activity} />;
      })}

      {hasPagination && hasPagination}

      {seeActivities && (
        <Flex
          justify={"space-between"}
          align={"center"}
          onClick={() => router.push("/dashboard/activity")}
          cursor={"pointer"}
          _hover={{ textDecoration: "underline" }}
          pt={"2rem"}
        >
          <Text
            color="#201F22"
            fontWeight="700"
            fontSize="16px"
            lineHeight="22px"
          >
            Ver toda minha atividade
          </Text>
          <AiOutlineArrowRight size={"1.6rem"} color="#3A393E" />
        </Flex>
      )}
    </Flex>
  );
};
