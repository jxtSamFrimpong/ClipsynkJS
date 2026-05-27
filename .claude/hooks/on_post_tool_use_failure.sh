#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# on_post_tool_use_failure.sh — Hook: PostToolUseFailure
#
# Triggered when any Bash or run_command exits non-zero.
# Provides context and enforces the diagnostic/approval workflow.
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ACTIVE_DIR="$REPO_ROOT/docs/active"

INPUT=$(cat)

COMMAND=$(echo "$INPUT" | grep -o '"command"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 \
  | sed 's/.*"command"[[:space:]]*:[[:space:]]*"\([^"]*\)"/\1/' || echo "")

# Suppress noise: skip trivial shell utilities that fail normally
if echo "$COMMAND" | grep -qE "^(grep |kill |lsof |find |sleep |echo |ls |cat |head |tail |wc )"; then
    exit 0
fi

# Check for active task trackers
ACTIVE_COUNT=0
ACTIVE_NAMES=""
if [ -d "$ACTIVE_DIR" ]; then
    ACTIVE_COUNT=$(ls "$ACTIVE_DIR" 2>/dev/null | grep -c "^TASK_" || true)
    ACTIVE_NAMES=$(ls "$ACTIVE_DIR" 2>/dev/null | grep "^TASK_" | tr '\n' ', ' || true)
fi

cat << 'EOF'
╔══════════════════════════════════════════════════════════════════╗
║  TOOL FAILURE — DIAGNOSIS WORKFLOW ENFORCED                     ║
╠══════════════════════════════════════════════════════════════════╣
║  Step 1:  Diagnose root cause using Log Analysis Protocol        ║
║           Propose fix with reason, trade-offs, risks             ║
║           DO NOT implement yet — stop after proposing            ║
║                                                                  ║
║  Step 2:  Review and approve/redirect diagnosis with User        ║
║                                                                  ║
║  Step 3:  Implement the approved fix, verify it resolves         ║
║           the error, update the task tracker                     ║
╚══════════════════════════════════════════════════════════════════╝
EOF

if [ "$ACTIVE_COUNT" -gt 0 ]; then
    echo "  Active task tracker(s): $ACTIVE_NAMES"
fi
