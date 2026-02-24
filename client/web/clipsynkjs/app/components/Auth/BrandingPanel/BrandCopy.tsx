// ─────────────────────────────────────────────
//  BRAND COPY
//  Title + description block inside the left
//  branding panel. Title supports \n line breaks
//  via whitespace-pre-line.
// ─────────────────────────────────────────────
interface BrandCopyProps {
    title: string;
    description: string;
}

export default function BrandCopy({ title, description }: BrandCopyProps) {
    return (
        <div className="flex flex-col gap-4 w-full">
            <p
                className="text-[#FAFAFA] font-mono font-bold leading-[1.3] whitespace-pre-line"
                style={{ fontSize: 32 }}
            >
                {title}
            </p>
            <p className="text-[#6B7280] font-mono text-sm leading-relaxed w-full">
                {description}
            </p>
        </div>
    );
}
