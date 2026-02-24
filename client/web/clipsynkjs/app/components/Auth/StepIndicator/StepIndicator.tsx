import StepItem from "./StepItem";
import type { StepState } from "./StepItem";

// ─────────────────────────────────────────────
//  STEP INDICATOR
//  3-step progress list shown at the bottom of
//  the branding panel on the Forgot Password,
//  Verify Token, and Reset Password pages.
//
//  activeStep = 1 → step 1 active, 2+3 upcoming
//  activeStep = 2 → step 1 done, 2 active, 3 upcoming
//  activeStep = 3 → steps 1+2 done, 3 active
// ─────────────────────────────────────────────
const STEPS = [
    { number: "01", text: "enter your email address" },
    { number: "02", text: "verify the token we send" },
    { number: "03", text: "set your new password" },
] as const;

interface StepIndicatorProps {
    activeStep: 1 | 2 | 3;
}

export default function StepIndicator({ activeStep }: StepIndicatorProps) {
    return (
        <div className="flex flex-col gap-5 w-full">
            {STEPS.map((step, i) => {
                const n = i + 1;
                const state: StepState =
                    n < activeStep  ? "done"     :
                    n === activeStep ? "active"  :
                                       "upcoming";
                return (
                    <StepItem
                        key={step.number}
                        number={step.number}
                        text={step.text}
                        state={state}
                    />
                );
            })}
        </div>
    );
}
