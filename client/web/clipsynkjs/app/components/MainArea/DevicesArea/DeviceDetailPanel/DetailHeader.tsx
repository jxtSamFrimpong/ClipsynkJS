// ─────────────────────────────────────────────
//  DETAIL HEADER
//  Device name + [primary] badge + OS meta
//  on the left; deactivate + unlink actions right.
//  Reads the active device from DevicesContext.
//  TODO (API): deactivate → PATCH /devices/:id { status: 'inactive' }
//  TODO (API): unlink     → DELETE /devices/:id
// ─────────────────────────────────────────────
import { useDevices, getDetailMeta } from '~/context/DevicesContext';

export default function DetailHeader() {
    const { selectedDevice } = useDevices();

    return (
        <div className="flex items-start justify-between w-full">
            {/* device identity */}
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                    <span
                        className="font-mono font-bold"
                        style={{ color: "#FAFAFA", fontSize: 20 }}
                    >
                        {selectedDevice.name}
                    </span>
                    {selectedDevice.isPrimary && (
                        <span
                            className="font-mono text-[9px] px-2 py-0.5"
                            style={{ color: "#10B981", border: "1px solid #10B981" }}
                        >
                            primary
                        </span>
                    )}
                </div>
                <span
                    className="font-mono text-[12px]"
                    style={{ color: "#6B7280" }}
                >
                    {getDetailMeta(selectedDevice)}
                </span>
            </div>

            {/* actions */}
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="cursor-pointer font-mono text-[11px] transition-opacity hover:opacity-70"
                    onClick={() => console.log('[DetailHeader] deactivate:', selectedDevice.id)}
                    style={{
                        color: "#6B7280",
                        border: "1px solid #2A2A2A",
                        height: 32,
                        padding: "0 12px",
                        backgroundColor: "transparent",
                    }}
                >
                    deactivate
                </button>
                <button
                    type="button"
                    className="cursor-pointer font-mono text-[11px] transition-opacity hover:opacity-70"
                    onClick={() => console.log('[DetailHeader] unlink:', selectedDevice.id)}
                    style={{
                        color: "#EF4444",
                        border: "1px solid #EF4444",
                        height: 32,
                        padding: "0 12px",
                        backgroundColor: "transparent",
                    }}
                >
                    unlink
                </button>
            </div>
        </div>
    );
}
