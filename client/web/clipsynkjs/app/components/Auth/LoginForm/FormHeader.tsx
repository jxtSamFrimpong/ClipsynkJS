import type { ReactNode } from "react";

// ─────────────────────────────────────────────
//  FORM HEADER
//  Title + subtitle at the top of every auth
//  form. Optional `extra` slot for additional
//  content below the subtitle (e.g. Verify Token
//  "sent to:" row).
// ─────────────────────────────────────────────
interface FormHeaderProps {
    title: string;
    subtitle: string;
    extra?: ReactNode;
}

export default function FormHeader({ title, subtitle, extra }: FormHeaderProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <h2 className="text-[#FAFAFA] font-mono font-bold text-2xl">{title}</h2>
            <p className="text-[#6B7280] font-mono text-sm">{subtitle}</p>
            {extra}
        </div>
    );
}
