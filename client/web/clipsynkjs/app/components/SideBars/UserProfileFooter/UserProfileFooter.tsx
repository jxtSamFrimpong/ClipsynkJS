// ─────────────────────────────────────────────
//  USER FOOTER
// ─────────────────────────────────────────────
function UserProfileFooter({ collapsed }: { collapsed: boolean }) {
    return (
        <div className="border-t border-[#222] px-3 py-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full shrink-0 bg-green-400" />
            {!collapsed && (
                <span className="text-green-400 font-mono text-sm truncate">alex_chen</span>
            )}
        </div>
    );
}

export default UserProfileFooter;