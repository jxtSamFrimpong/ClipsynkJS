import { useNavigate } from "react-router";
import { useDashboard } from "~/context/DashboardContext";

// ─────────────────────────────────────────────
//  UPGRADE TO PRO
//  Upgrade button navigates to /profile/plan.
// ─────────────────────────────────────────────
function UpgradeToPro() {
    const { collapsed } = useDashboard();
    const navigate = useNavigate();

    if (collapsed) return null;

    return (
        <div
            onClick={() => navigate("/profile/plan")}
            className="mx-3 mb-3 p-3 rounded border border-yellow-700/40 cursor-pointer">
            <p className="text-yellow-400 font-mono text-xs mb-1">$ upgrade --pro</p>
            <p className="text-yellow-600/70 font-mono text-xs leading-relaxed mb-3">
                unlock unlimited devices and encrypted sync
            </p>
            <button
                className="cursor-pointer w-full py-1.5 px-3 bg-green-500 hover:bg-green-400 text-black font-mono font-bold text-xs rounded transition-colors"
            >
                $ run upgrade
            </button>
        </div>
    );
}

export default UpgradeToPro;
