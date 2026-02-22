import { useDashboard } from "~/context/DashboardContext";

// ─────────────────────────────────────────────
//  UPGRADE TO PRO
// ─────────────────────────────────────────────
function UpgradeToPro() {
    const { collapsed } = useDashboard();

    if (collapsed) return null;

    return (
        <div className="mx-3 mb-3 p-3 rounded border border-yellow-700/40">
            <p className="text-yellow-400 font-mono text-xs mb-1">$ upgrade --pro</p>
            <p className="text-yellow-600/70 font-mono text-xs leading-relaxed mb-3">
                unlock unlimited devices and encrypted sync
            </p>
            <button className="w-full py-1.5 px-3 bg-green-500 hover:bg-green-400 text-black font-mono font-bold text-xs rounded transition-colors">
                $ run upgrade
            </button>
        </div>
    );
}

export default UpgradeToPro;
