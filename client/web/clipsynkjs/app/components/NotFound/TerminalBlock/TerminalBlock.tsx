import TerminalLine from "./TerminalLine";
import TerminalCursor from "./TerminalCursor";

// ─────────────────────────────────────────────
//  TERMINAL BLOCK
// ─────────────────────────────────────────────
export default function TerminalBlock() {
    return (
        <div className="w-full border border-[#2a2a2a] p-6 flex flex-col gap-2">

            {/* line 1: prompt + command */}
            <TerminalLine>
                <span className="text-[#10B981] font-bold">{">"}</span>
                <span className="text-[#FAFAFA]">cd /requested/route</span>
            </TerminalLine>

            {/* line 2: error prefix + message */}
            <TerminalLine>
                <span className="text-red-500 font-semibold">err:</span>
                <span className="text-gray-500">path not found. no matching route exists.</span>
            </TerminalLine>

            {/* line 3: prompt + blinking cursor */}
            <TerminalLine>
                <span className="text-[#10B981] font-bold">{">"}</span>
                <TerminalCursor />
            </TerminalLine>

        </div>
    );
}
