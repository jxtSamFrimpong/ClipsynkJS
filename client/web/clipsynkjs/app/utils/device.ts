// ─────────────────────────────────────────────
//  DEVICE UTILS
//  Browser-only helpers for collecting hardware-
//  bound device signals. Must only be called
//  inside event handlers or useEffect — never
//  during SSR (navigator/screen are unavailable).
// ─────────────────────────────────────────────

export interface DeviceInfo {
    fingerprint: string;
    name: string;
    os: string;
    osVersion: string;
    platformInfo: Record<string, string>;
}

// ── fingerprint ──────────────────────────────
// Uses WebGL renderer strings + canvas pixel output.
// Both are GPU-bound and stable across browser
// updates, timezone changes, and screen changes.
// Only changes if the GPU or GPU driver changes.
export function buildFingerprint(): string {
    const components: string[] = [];

    const glCanvas = document.createElement('canvas');
    const gl = (glCanvas.getContext('webgl') ?? glCanvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (gl) {
        const dbgInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (dbgInfo) {
            components.push(gl.getParameter(dbgInfo.UNMASKED_VENDOR_WEBGL)   as string);
            components.push(gl.getParameter(dbgInfo.UNMASKED_RENDERER_WEBGL) as string);
        } else {
            components.push(gl.getParameter(gl.VENDOR)   as string);
            components.push(gl.getParameter(gl.RENDERER) as string);
        }
    }

    const c2d = document.createElement('canvas');
    c2d.width = 240; c2d.height = 60;
    const ctx = c2d.getContext('2d');
    if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font         = '14px monospace';
        ctx.fillStyle    = '#10B981';
        ctx.fillRect(0, 0, 240, 60);
        ctx.fillStyle = '#0d0d0d';
        ctx.fillText('clipsynk\u25c6probe', 2, 2);
        ctx.fillStyle = 'rgba(16,185,129,0.5)';
        ctx.fillText('clipsynk\u25c6probe', 4, 4);
        components.push(c2d.toDataURL().slice(-100));
    }

    components.push(navigator.platform);

    const raw = components.join('|');
    let hash = 5381;
    for (let i = 0; i < raw.length; i++) {
        hash = (hash * 33) ^ raw.charCodeAt(i);
    }
    return (hash >>> 0).toString(16);
}

// ── full device info (used at signup) ────────
export function buildDeviceInfo(): DeviceInfo {
    const ua = navigator.userAgent;

    // ── os + osVersion — parsed from user-agent ─
    let os        = 'Unknown';
    let osVersion = '';

    if (/Windows/.test(ua)) {
        os = 'Windows';
        const m = ua.match(/Windows NT ([\d.]+)/);
        const nt: Record<string, string> = { '10.0': '10/11', '6.3': '8.1', '6.2': '8', '6.1': '7' };
        osVersion = m ? (nt[m[1]] ?? m[1]) : '';
    } else if (/Android/.test(ua)) {
        os = 'Android';
        const m = ua.match(/Android ([\d.]+)/);
        osVersion = m ? m[1] : '';
    } else if (/iPhone|iPad/.test(ua)) {
        os = 'iOS';
        const m = ua.match(/OS ([\d_]+)/);
        osVersion = m ? m[1].replace(/_/g, '.') : '';
    } else if (/Mac/.test(ua)) {
        os = 'macOS';
        const m = ua.match(/Mac OS X ([\d_]+)/);
        osVersion = m ? m[1].replace(/_/g, '.') : '';
    } else if (/Linux/.test(ua)) {
        os = 'Linux';
    }

    // ── device name — browser on OS ─────────────
    // Check Edge/Opera before Chrome — both include "Chrome" in their UA
    const browser = /Edg\//.test(ua)   ? 'Edge'
                  : /OPR\//.test(ua)   ? 'Opera'
                  : /Chrome/.test(ua)  ? 'Chrome'
                  : /Firefox/.test(ua) ? 'Firefox'
                  : /Safari/.test(ua)  ? 'Safari'
                  : 'Browser';

    return {
        fingerprint: buildFingerprint(),
        name:        `${browser} on ${os}`,
        os,
        osVersion,
        platformInfo: {
            userAgent:  ua,
            language:   navigator.language,
            platform:   navigator.platform,
            clientType: 'web',
        },
    };
}
