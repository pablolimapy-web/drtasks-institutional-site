import type {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  RefAttributes,
} from "react";

export type StepIndicatorRenderArgs = {
  step: number;
  currentStep: number;
  onStepClick: (step: number) => void;
};

export type StepperProps = PropsWithChildren<
  Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
    initialStep?: number;
    onStepChange?: (step: number) => void;
    onFinalStepCompleted?: () => void;
    stepCircleContainerClassName?: string;
    stepContainerClassName?: string;
    contentClassName?: string;
    footerClassName?: string;
    backButtonProps?: ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>;
    nextButtonProps?: ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>;
    backButtonText?: string;
    nextButtonText?: string;
    disableStepIndicators?: boolean;
    renderStepIndicator?: (args: StepIndicatorRenderArgs) => ReactNode;
    style?: CSSProperties;
  }
>;

export default function Stepper(props: StepperProps): ReactNode;
export function Step(props: PropsWithChildren): ReactNode;
