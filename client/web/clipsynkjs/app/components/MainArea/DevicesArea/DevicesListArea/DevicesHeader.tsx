// ─────────────────────────────────────────────
//  DEVICES HEADER
//  "> devices" prompt title only.
//  Devices are linked automatically on login —
//  no manual link action needed here.
// ─────────────────────────────────────────────
export default function DevicesHeader() {
    return (
        <div className="flex items-center gap-2.5">
            <span
                className="font-mono font-bold"
                style={{ color: "#10B981", fontSize: 24 }}
            >
                &gt;
            </span>
            <span
                className="font-mono font-bold"
                style={{ color: "#FAFAFA", fontSize: 20 }}
            >
                devices
            </span>
        </div>
    );
}
