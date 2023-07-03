"use client";
import { ButtonDashboard } from "@/components/ButtonDashboard";
import { useStep } from "@/contexts/steps";
import { BsPersonCircle } from "react-icons/bs";
import { WalletIcon } from "../components/WalletIcon";
import { useRouter } from "next/navigation";

export const Step1 = () => {
  const { setStep } = useStep();

  const { push } = useRouter();

  return (
    <>
      <ButtonDashboard
        leftIcon={<BsPersonCircle size={"33px"} color="#C1FD35" />}
        label={"Transferência bancária"}
        onClick={() => push("/dashboard/recharge-value/bank-transfer")}
      />

      <ButtonDashboard
        label={"Selecionar cartão"}
        onClick={() => setStep(2)}
        leftIcon={<WalletIcon />}
      />
    </>
  );
};
