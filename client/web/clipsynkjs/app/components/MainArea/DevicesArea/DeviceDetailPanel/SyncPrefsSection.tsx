// ─────────────────────────────────────────────
//  SYNC PREFERENCES SECTION
//  "// sync_preferences" header + 5 key-value rows.
//  TODO (API): syncPrefs comes from selectedDevice.syncPrefs
//  in mock data. Replace with GET /devices/:id/prefs
//  Response: { prefs: SyncPrefs }
// ─────────────────────────────────────────────
import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import { useDevices } from '~/context/DevicesContext';

export default function SyncPrefsSection() {
    const { selectedDevice } = useDevices();
    const p = selectedDevice.syncPrefs;

    const PREFS = [
        { label: 'auto_sync',     value: p.autoSync ? 'enabled' : 'disabled', valueColor: p.autoSync ? '#10B981' : '#6B7280' },
        { label: 'sync_interval', value: p.syncInterval,                       valueColor: '#FAFAFA' },
        { label: 'sync_types',    value: p.syncTypes,                          valueColor: '#FAFAFA' },
        { label: 'max_file_size', value: p.maxFileSize,                        valueColor: '#FAFAFA' },
        { label: 'encryption',    value: p.encryption,                         valueColor: p.encryption === 'e2e' ? '#10B981' : '#6B7280' },
    ];

    return (
        <div className="flex flex-col gap-3 w-full">
            <SectionLabel label="sync_preferences" />

            <div className="flex flex-col gap-1.5 w-full">
                {PREFS.map((p) => (
                    <div
                        key={p.label}
                        className="flex items-center justify-between w-full"
                    >
                        <span
                            className="font-mono text-[12px]"
                            style={{ color: "#9CA3AF" }}
                        >
                            {p.label}
                        </span>
                        <span
                            className="font-mono text-[12px]"
                            style={{ color: p.valueColor }}
                        >
                            {p.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
