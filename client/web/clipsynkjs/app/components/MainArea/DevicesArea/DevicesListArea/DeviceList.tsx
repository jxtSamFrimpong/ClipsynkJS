// ─────────────────────────────────────────────
//  DEVICE LIST
//  Scrollable list of device rows.
//  Selection state and device data live in
//  DevicesContext — no local state here.
//  TODO (API): devices come from mock data in
//  DevicesContext. Replace with GET /devices.
// ─────────────────────────────────────────────
import DeviceListItem from "./DeviceListItem";
import {
    useDevices,
    getListMeta,
    STATUS_DOT_COLOR,
    STATUS_META_COLOR,
} from '~/context/DevicesContext';

export default function DeviceList() {
    const { devices, selectedId, setSelectedId } = useDevices();

    return (
        <div className="flex flex-col w-full flex-1 min-h-0">
            {devices.map((device, i) => (
                <DeviceListItem
                    key={device.id}
                    id={device.id}
                    name={device.name}
                    meta={getListMeta(device)}
                    dotColor={STATUS_DOT_COLOR[device.status]}
                    metaColor={device.status === 'online' && device.isPrimary
                        ? '#10B981'
                        : STATUS_META_COLOR[device.status]
                    }
                    badge={device.isPrimary ? '[*]' : undefined}
                    isSelected={device.id === selectedId}
                    isLast={i === devices.length - 1}
                    onClick={() => {
                        console.log('[DeviceList] selected:', device.id);
                        setSelectedId(device.id);
                    }}
                />
            ))}
        </div>
    );
}
