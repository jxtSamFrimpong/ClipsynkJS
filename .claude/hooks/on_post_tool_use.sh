#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# on_post_tool_use.sh — Hook: PostToolUse
#
# Triggered after successful: Edit, Write, or Bash tool use.
# For Bash, only fires for: npm or node commands.
# Receives JSON on stdin with tool details.
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

# Read stdin (JSON with tool details)
INPUT=$(cat)

# Extract tool name
TOOL_NAME=$(echo "$INPUT" | grep -o '"tool_name"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"tool_name"[[:space:]]*:[[:space:]]*"\([^"]*\)"/\1/' || echo "")

# For Edit/Write — always relevant
if echo "$TOOL_NAME" | grep -qiE "^(Edit|Write)$"; then
    echo "[PostToolUse] File modified. Update active task tracker if this completed or advanced a subtask."
    exit 0
fi

# For Bash/run_command — only match npm/node commands
if echo "$TOOL_NAME" | grep -qiE "^(Bash|run_command)$"; then
    COMMAND=$(echo "$INPUT" | grep -o '"command"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"command"[[:space:]]*:[[:space:]]*"\([^"]*\)"/\1/' || echo "")

    if echo "$COMMAND" | grep -qE "(^npm |^node |npm run dev|npm test|npm start)"; then
        echo "[PostToolUse] Code execution succeeded. Update active task tracker if this completed or advanced a subtask."
        exit 0
    fi
fi
