// ─────────────────────────────────────────────
//  CLIP GROUPS SECTION
//  "// clipgroups" header + join button + list
//  of groups the selected device belongs to.
//  TODO (API): clipGroups comes from selectedDevice.clipGroups
//  in mock data. Replace with GET /devices/:id/groups
//  Response: { groups: ClipGroup[] }
// ─────────────────────────────────────────────
import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import { useDevices } from '~/context/DevicesContext';

export default function ClipGroupsSection() {
    const { selectedDevice } = useDevices();
    const groups = selectedDevice.clipGroups;

    return (
        <div className="flex flex-col gap-3 w-full">
            {/* header */}
            <div className="flex items-center justify-between w-full">
                <SectionLabel label="clipgroups" />
                <button
                    type="button"
                    className="cursor-pointer font-mono text-[11px] transition-opacity hover:opacity-70"
                    style={{ color: "#10B981", backgroundColor: "transparent" }}
                >
                    + join
                </button>
            </div>

            {/* group list */}
            <div className="flex flex-col gap-1 w-full">
                {groups.map((g) => (
                    <div
                        key={g.id}
                        className="flex items-center gap-2 w-full"
                        style={{ border: "1px solid #2A2A2A", padding: "10px 12px" }}
                    >
                        {/* dot */}
                        <div
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                backgroundColor: g.dotColor,
                                flexShrink: 0,
                            }}
                        />

                        {/* name */}
                        <span
                            className="font-mono text-[12px] text-[#FAFAFA] truncate"
                        >
                            {g.name}
                        </span>

                        {/* tag */}
                        {g.tag && (
                            <span
                                className="font-mono text-[10px] flex-shrink-0"
                                style={{ color: "#4B5563" }}
                            >
                                {g.tag}
                            </span>
                        )}

                        {/* spacer */}
                        <div className="flex-1" />

                        {/* member count */}
                        <span
                            className="font-mono text-[10px] flex-shrink-0"
                            style={{ color: "#6B7280" }}
                        >
                            {g.memberCount} devices
                        </span>

                        {/* leave */}
                        {g.canLeave && (
                            <button
                                type="button"
                                className="cursor-pointer font-mono text-[10px] flex-shrink-0 ml-2 transition-opacity hover:opacity-70"
                                style={{ color: "#EF4444", backgroundColor: "transparent" }}
                            >
                                leave
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
