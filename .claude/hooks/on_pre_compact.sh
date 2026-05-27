#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# on_pre_compact.sh — Hook: PreCompact
#
# Triggered before context compaction (when conversation gets long).
# Outputs the current session state and active task trackers so
# the agent preserves critical context through compaction.
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ACTIVE_DIR="$REPO_ROOT/docs/active"
CLAUDE_MD="$REPO_ROOT/.claude/CLAUDE.md"

cat << 'EOF'
═══════════════════════════════════════════════════
  HOOK: PreCompact — Preserving Critical Context
═══════════════════════════════════════════════════

Context is about to be compacted. Preserve the following:

EOF

# Output current session state from CLAUDE.md
if [ -f "$CLAUDE_MD" ]; then
    echo "── Current Session State (from CLAUDE.md) ──"
    # Extract everything from "## Session State" to end of file
    sed -n '/^## Session State/,$ p' "$CLAUDE_MD"
    echo ""
fi

# Output active task tracker contents
if [ -d "$ACTIVE_DIR" ]; then
    for f in "$ACTIVE_DIR"/TASK_*.md; do
        if [ -f "$f" ]; then
            echo "── Active Task: $(basename "$f") ──"
            cat "$f"
            echo ""
        fi
    done
fi

cat << 'EOF'
═══════════════════════════════════════════════════
IMPORTANT: After compaction, you MUST retain:
  - Which task/subtask is currently in progress
  - The iteration plan and current iteration number
  - Any decisions made this session
  - Any blockers or open questions
  - Any user instructions/corrections

COMPACTION RULES (enforce during compaction):
  - TASK COMPACTION: Max 3 detailed tasks in 'What was completed'.
    If over 3, compact the oldest into a milestone summary.
  - DECISION COMPACTION: Max 2 dated 'Resolved decisions' blocks.
    If over 2, MOVE the oldest block(s) to docs/reference/decisions.md
    (append to end of file). Only settled decisions get archived.
═══════════════════════════════════════════════════
EOF
