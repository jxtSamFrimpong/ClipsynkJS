#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# on_subagent_stop.sh — Hook: SubagentStop
#
# Triggered when a subagent finishes.
# Outputs a reminder to capture what the subagent accomplished
# and update the active task tracker accordingly.
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ACTIVE_DIR="$REPO_ROOT/docs/active"

# Check for active task trackers
ACTIVE_COUNT=0
if [ -d "$ACTIVE_DIR" ]; then
    ACTIVE_COUNT=$(ls "$ACTIVE_DIR" 2>/dev/null | grep -c "^TASK_" || true)
fi

# Only output if there are active tasks to track
if [ "$ACTIVE_COUNT" -gt 0 ]; then
    cat << 'EOF'
[SubagentStop] Subagent finished. If it completed work on an active task:
  - Update the task tracker in docs/active/ with what was accomplished
  - Update subtask status (⬚ → 🔄 → ✅)
  - Note iteration progress and any decisions made
EOF
    echo "  Active trackers: $(ls "$ACTIVE_DIR" | grep "^TASK_" | tr '\n' ', ')"
fi
