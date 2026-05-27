#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# on_post_tool_batch.sh — Hook: PostToolBatch
#
# Triggered after a batch of tool uses.
# Only outputs for: Edit, Write, or run_command (npm/node only).
# Receives JSON on stdin with batch details.
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ACTIVE_DIR="$REPO_ROOT/docs/active"

# No active tasks = no output
ACTIVE_COUNT=0
if [ -d "$ACTIVE_DIR" ]; then
    ACTIVE_COUNT=$(ls "$ACTIVE_DIR" 2>/dev/null | grep -c "^TASK_" || true)
fi
[ "$ACTIVE_COUNT" -eq 0 ] && exit 0

# Read stdin (JSON with batch details)
INPUT=$(cat)

# Check if batch contains relevant tools
HAS_EDIT=$(echo "$INPUT" | grep -ciE '"(Edit|Write)"' || true)
HAS_RELEVANT_CMD=$(echo "$INPUT" | grep -cE '(npm |node |npm run dev|npm test|npm start)' || true)

if [ "$HAS_EDIT" -gt 0 ] || [ "$HAS_RELEVANT_CMD" -gt 0 ]; then
    echo "[PostToolBatch] Batch complete (files edited or code executed). Update active task tracker if subtask progress changed."
fi
