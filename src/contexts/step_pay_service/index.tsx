import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface StepProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepContext = createContext<StepProps>({} as StepProps);

interface ProviderProps {
  children: ReactNode;
}

export const StepProviderPayService = ({ children }: ProviderProps) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    setStep(1);
  }, []);

  return (
    <StepContext.Provider value={{ setStep, step }}>
      {children}
    </StepContext.Provider>
  );
};

export function useStepPayService() {
  const context = useContext(StepContext);
  return context;
}
