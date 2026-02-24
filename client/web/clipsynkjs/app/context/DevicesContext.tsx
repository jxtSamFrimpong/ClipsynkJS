// ─────────────────────────────────────────────
//  DEVICES CONTEXT
//  Provides the devices list, selected device,
//  selection state, and computed overview counts
//  to all components under DevicesMainArea.
//
//  Mock data lives here until replaced by API.
//  See: app/todos/TODOS.md
// ─────────────────────────────────────────────
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// ── Domain types ────────────────────────────

export type DeviceStatus = 'online' | 'idle' | 'inactive';

export interface DeviceStats {
    clipsSynced: number;
    lastSync:    string;
    avgPerDay:   number;
    storageUsed: string;
}

export interface ClipGroup {
    id:          string;
    name:        string;
    dotColor:    string;
    tag?:        string;        // e.g. "[default]"
    memberCount: number;
    canLeave:    boolean;
}

export interface SyncPrefs {
    autoSync:     boolean;
    syncInterval: string;       // "realtime", "every 5m", "manual"
    syncTypes:    string;       // "text, image, file"
    maxFileSize:  string;       // "25MB"
    encryption:   string;       // "e2e", "none"
}

export interface Device {
    id:             string;
    name:           string;     // display name, e.g. "macbook_pro"
    os:             string;     // "macOS", "iOS", "Ubuntu", etc.
    osVersion:      string;     // "14.2"
    chipInfo:       string;     // "Apple M2 Pro"
    linkedDaysAgo:  number;
    status:         DeviceStatus;
    isPrimary:      boolean;
    lastSyncText:   string;     // "active now", "synced 2m ago", "idle 45m", "deactivated"
    stats:          DeviceStats;
    // 4 time-band rows × 7 day columns, values 0–4
    // 0=none 1=very-low 2=low 3=medium 4=high
    activityHeatmap: number[][];
    clipGroups:     ClipGroup[];
    syncPrefs:      SyncPrefs;
}

// ── Helpers ──────────────────────────────────

export const STATUS_DOT_COLOR: Record<DeviceStatus, string> = {
    online:   '#10B981',
    idle:     '#F59E0B',
    inactive: '#6B7280',
};

export const STATUS_META_COLOR: Record<DeviceStatus, string> = {
    online:   '#10B981',
    idle:     '#F59E0B',
    inactive: '#4B5563',
};

export function getListMeta(d: Device): string {
    const parts = [d.os];
    if (d.isPrimary) parts.push('primary');
    parts.push(d.lastSyncText);
    return parts.join(' · ');
}

export function getDetailMeta(d: Device): string {
    return `${d.os} ${d.osVersion} · ${d.chipInfo} · linked ${d.linkedDaysAgo} days ago`;
}

// ── Mock data (replace with API call) ────────
// TODO (API): Replace MOCK_DEVICES with data from GET /devices
// Each device object maps 1:1 to a DeviceEntity from the backend.

const MOCK_DEVICES: Device[] = [
    {
        id:            'macbook',
        name:          'macbook_pro',
        os:            'macOS',
        osVersion:     '14.2',
        chipInfo:      'Apple M2 Pro',
        linkedDaysAgo: 142,
        status:        'online',
        isPrimary:     true,
        lastSyncText:  'active now',
        stats: {
            clipsSynced: 2847,
            lastSync:    '2m ago',
            avgPerDay:   42,
            storageUsed: '1.2GB',
        },
        // rows: [00h-06h, 06h-12h, 12h-18h, 18h-24h]  cols: Mon-Sun
        activityHeatmap: [
            [1, 2, 1, 0, 1, 0, 0],
            [3, 4, 3, 4, 2, 1, 0],
            [4, 3, 4, 3, 4, 2, 1],
            [2, 1, 2, 1, 2, 0, 0],
        ],
        clipGroups: [
            { id: 'personal',      name: 'personal',      dotColor: '#10B981', tag: '[default]', memberCount: 3,  canLeave: false },
            { id: 'design_team',   name: 'design_team',   dotColor: '#06B6D4', memberCount: 8,  canLeave: true  },
            { id: 'shared_assets', name: 'shared_assets', dotColor: '#A855F7', memberCount: 12, canLeave: true  },
        ],
        syncPrefs: {
            autoSync:     true,
            syncInterval: 'realtime',
            syncTypes:    'text, image, file',
            maxFileSize:  '25MB',
            encryption:   'e2e',
        },
    },
    {
        id:            'iphone',
        name:          'iphone_14',
        os:            'iOS',
        osVersion:     '17.2',
        chipInfo:      'Apple A16 Bionic',
        linkedDaysAgo: 98,
        status:        'online',
        isPrimary:     false,
        lastSyncText:  'synced 2m ago',
        stats: {
            clipsSynced: 1204,
            lastSync:    '2m ago',
            avgPerDay:   18,
            storageUsed: '340MB',
        },
        activityHeatmap: [
            [0, 0, 1, 0, 0, 0, 0],
            [2, 3, 2, 3, 1, 0, 0],
            [3, 2, 3, 2, 3, 1, 0],
            [1, 0, 1, 0, 1, 2, 1],
        ],
        clipGroups: [
            { id: 'personal', name: 'personal', dotColor: '#10B981', tag: '[default]', memberCount: 3, canLeave: false },
        ],
        syncPrefs: {
            autoSync:     true,
            syncInterval: 'realtime',
            syncTypes:    'text, image',
            maxFileSize:  '10MB',
            encryption:   'e2e',
        },
    },
    {
        id:            'linux',
        name:          'linux_desktop',
        os:            'Ubuntu',
        osVersion:     '22.04',
        chipInfo:      'AMD Ryzen 7 5800X',
        linkedDaysAgo: 67,
        status:        'online',
        isPrimary:     false,
        lastSyncText:  'synced 8m ago',
        stats: {
            clipsSynced: 892,
            lastSync:    '8m ago',
            avgPerDay:   31,
            storageUsed: '780MB',
        },
        activityHeatmap: [
            [0, 1, 0, 1, 0, 0, 0],
            [1, 2, 3, 2, 1, 0, 0],
            [4, 4, 4, 4, 3, 1, 0],
            [2, 3, 2, 3, 2, 0, 0],
        ],
        clipGroups: [
            { id: 'personal',      name: 'personal',      dotColor: '#10B981', tag: '[default]', memberCount: 3,  canLeave: false },
            { id: 'shared_assets', name: 'shared_assets', dotColor: '#A855F7', memberCount: 12, canLeave: true  },
        ],
        syncPrefs: {
            autoSync:     true,
            syncInterval: 'realtime',
            syncTypes:    'text, image, file, code',
            maxFileSize:  '25MB',
            encryption:   'e2e',
        },
    },
    {
        id:            'ipad',
        name:          'ipad_pro',
        os:            'iPadOS',
        osVersion:     '17.1',
        chipInfo:      'Apple M2',
        linkedDaysAgo: 45,
        status:        'idle',
        isPrimary:     false,
        lastSyncText:  'idle 45m',
        stats: {
            clipsSynced: 312,
            lastSync:    '45m ago',
            avgPerDay:   8,
            storageUsed: '120MB',
        },
        activityHeatmap: [
            [0, 0, 0, 0, 0, 0, 0],
            [1, 2, 1, 1, 0, 0, 0],
            [2, 1, 2, 1, 1, 0, 0],
            [1, 0, 1, 0, 0, 1, 2],
        ],
        clipGroups: [
            { id: 'personal',    name: 'personal',    dotColor: '#10B981', tag: '[default]', memberCount: 3, canLeave: false },
            { id: 'design_team', name: 'design_team', dotColor: '#06B6D4', memberCount: 8,  canLeave: true  },
        ],
        syncPrefs: {
            autoSync:     true,
            syncInterval: 'every 5m',
            syncTypes:    'text, image',
            maxFileSize:  '10MB',
            encryption:   'e2e',
        },
    },
    {
        id:            'old_laptop',
        name:          'old_laptop',
        os:            'Windows',
        osVersion:     '11',
        chipInfo:      'Intel Core i7-1165G7',
        linkedDaysAgo: 310,
        status:        'inactive',
        isPrimary:     false,
        lastSyncText:  'deactivated',
        stats: {
            clipsSynced: 4201,
            lastSync:    'never',
            avgPerDay:   0,
            storageUsed: '2.1GB',
        },
        activityHeatmap: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ],
        clipGroups: [
            { id: 'personal', name: 'personal', dotColor: '#10B981', tag: '[default]', memberCount: 3, canLeave: false },
        ],
        syncPrefs: {
            autoSync:     false,
            syncInterval: 'manual',
            syncTypes:    'text',
            maxFileSize:  '5MB',
            encryption:   'none',
        },
    },
];

// ── Context definition ────────────────────────

interface DevicesContextValue {
    devices:       Device[];
    selectedId:    string;
    setSelectedId: (id: string) => void;
    selectedDevice: Device;
    // Computed overview counts
    totalCount:    number;
    onlineCount:   number;
    idleCount:     number;
    inactiveCount: number;
}

const DevicesContext = createContext<DevicesContextValue | null>(null);

// ── Provider ─────────────────────────────────

export function DevicesProvider({ children }: { children: ReactNode }) {
    const [selectedId, setSelectedId] = useState<string>(MOCK_DEVICES[0].id);

    useEffect(() => {
        console.log('[DevicesContext] mounted, initial selectedId:', MOCK_DEVICES[0].id);
    }, []);

    useEffect(() => {
        console.log('[DevicesContext] selectedId changed:', selectedId);
    }, [selectedId]);

    const selectedDevice = MOCK_DEVICES.find(d => d.id === selectedId) ?? MOCK_DEVICES[0];

    const value: DevicesContextValue = {
        devices:        MOCK_DEVICES,
        selectedId,
        setSelectedId,
        selectedDevice,
        totalCount:     MOCK_DEVICES.length,
        onlineCount:    MOCK_DEVICES.filter(d => d.status === 'online').length,
        idleCount:      MOCK_DEVICES.filter(d => d.status === 'idle').length,
        inactiveCount:  MOCK_DEVICES.filter(d => d.status === 'inactive').length,
    };

    return (
        <DevicesContext.Provider value={value}>
            {children}
        </DevicesContext.Provider>
    );
}

// ── Hook ─────────────────────────────────────

export function useDevices(): DevicesContextValue {
    const ctx = useContext(DevicesContext);
    if (!ctx) throw new Error('useDevices must be used inside <DevicesProvider>');
    return ctx;
}
