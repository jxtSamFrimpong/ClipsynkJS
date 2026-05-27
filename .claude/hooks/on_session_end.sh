#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# on_session_end.sh — Hook: SessionEnd
#
# Triggered when a session ends.
# Outputs instructions for the agent to update CLAUDE.md Session State
# with a full handoff for the next session.
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ACTIVE_DIR="$REPO_ROOT/docs/active"

# List any active task trackers
ACTIVE_TASKS=""
if [ -d "$ACTIVE_DIR" ] && [ "$(ls -A "$ACTIVE_DIR" 2>/dev/null | grep -v TEMPLATE)" ]; then
    ACTIVE_TASKS=$(ls "$ACTIVE_DIR" | grep -v TEMPLATE | grep -v "^$" || true)
fi

cat << 'EOF'
═══════════════════════════════════════════════════
  HOOK: SessionEnd
═══════════════════════════════════════════════════

Session is ending. You MUST update .claude/CLAUDE.md Session State:

1. UPDATE "Last Session" date to today
2. UPDATE "What was completed" — list everything done this session
3. UPDATE "What is being worked on" — any in-progress work
4. UPDATE "Active task trackers" — list any remaining docs/active/ files
5. UPDATE "What is next" — the immediate next tasks to pick up
6. UPDATE "Blockers" — anything blocking progress
7. UPDATE "Open decisions for user" — any pending decisions

This ensures the next session can resume immediately by reading
CLAUDE.md alone, without re-reading the entire codebase.

EOF

if [ -n "$ACTIVE_TASKS" ]; then
    echo "⚠️  Active task trackers still open (do NOT delete — work is in progress):"
    for f in $ACTIVE_TASKS; do
        echo "  - docs/active/$f"
    done
else
    echo "No active task trackers — all tasks completed or none started."
fi

echo ""
echo "═══════════════════════════════════════════════════"
