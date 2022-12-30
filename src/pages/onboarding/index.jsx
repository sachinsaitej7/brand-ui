import React, { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

//context
import Store from "../../store";
import { OnboardingProvider, OnboardingContext } from "./context";

//images
import { ReactComponent as LeftArrow } from "../../assets/common/arrow-left.svg";

import { PageContainer } from "../../styled-components";

import Step0 from "./step-0";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      height: "80vh",
    };
  },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
  exit: (direction) => {
    return {
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      display: "none",
    };
  },
};

const StyledContainer = styled(PageContainer)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  .back {
    cursor: pointer;
    margin-top: ${(props) => props.theme.space[8]};
    width: 24px;
  }
`;

const StyledStepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: ${(props) => props.theme.space[3] + " " + props.theme.space[0]};
`;

const StyledStep = styled.div`
  background-color: ${(props) => (props.active ? "#3785FD" : "#D9D9D9")};
  padding: 2.5px;
  width: 23%;
`;
const { StoreContext } = Store;

const OnboardingPage = () => {
  const { step, prevStep, direction, setBrandId, setStep } =
    useContext(OnboardingContext);
  const { store } = useContext(StoreContext);

  useEffect(() => {
    if (!store) return;
    setBrandId(store.id);
    if (!store.tags) setStep(2);
    else if (!store.address) setStep(3);
    else if (!store.status) setStep(4);
  }, [setBrandId, setStep, store]);

  return (
    <StyledContainer>
      {step === 0 && <Step0 />}
      {step > 0 && (
        <>
          <StyledStepContainer>
            {Array(4)
              .fill(0)
              .map((_, i) => {
                return <StyledStep key={i} active={step > i}></StyledStep>;
              })}
          </StyledStepContainer>
          {step > 1 && <LeftArrow className='back' onClick={prevStep} />}
          <div style={{ width: "100%" }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial='enter'
                animate='center'
                exit='exit'
                // transition={{
                //   x: { type: "spring", stiffness: 30, damping: 10 },
                // }}
              >
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                {step === 4 && <Step4 />}
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </StyledContainer>
  );
};

export default function Home() {
  return (
    <OnboardingProvider>
      <OnboardingPage />
    </OnboardingProvider>
  );
}
