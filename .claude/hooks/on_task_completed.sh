#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# on_task_completed.sh — Hook: TaskCompleted
#
# Triggered after every task completion.
# Outputs instructions for the agent to:
#   1. Update the active task tracker in docs/active/
#   2. Update CLAUDE.md Session State
#   3. Move the task tracker to docs/archive/tasks/ upon approval
#
# The output of this script is injected into the agent's context.
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ACTIVE_DIR="$REPO_ROOT/docs/active"
CLAUDE_MD="$REPO_ROOT/.claude/CLAUDE.md"

# List any active task trackers
ACTIVE_TASKS=""
if [ -d "$ACTIVE_DIR" ] && [ "$(ls -A "$ACTIVE_DIR" 2>/dev/null | grep -v TEMPLATE)" ]; then
    ACTIVE_TASKS=$(ls "$ACTIVE_DIR" | grep -v TEMPLATE | grep -v "^$" || true)
fi

cat << 'EOF'
═══════════════════════════════════════════════════
  HOOK: TaskCompleted
═══════════════════════════════════════════════════

A task has been completed. You MUST now:

1. UPDATE the active task tracker in docs/active/:
   - Mark all subtasks as ✅ Done
   - Record any decisions made during the task
   - Note any issues encountered
   - Add and Commit the changed files to git

2. REVIEW the implementation:
   (Perform a self-review of the implementation against design specs before presenting to the user)

3. PRESENT the completed task to the user for review/approval

4. After user approval:
   - MOVE the task tracker file from docs/active/ to docs/archive/tasks/
   - UPDATE .claude/CLAUDE.md Session State:
     - Move task from "What is being worked on" to "What was completed"
     - ENFORCE TASK COMPACTION: Max 3 detailed tasks in "What was completed".
       If this task makes it 4+, compact the oldest into a milestone summary.
     - ENFORCE DECISION COMPACTION: Max 2 dated "Resolved decisions" blocks.
       If over 2, MOVE the oldest block(s) to docs/reference/decisions.md (append to end of file).
       A "decision" = a choice between viable alternatives that affects future
       code (e.g. "React Router not Next.js", "cookie-parser in main.ts").
     - Update "Active task trackers" list
     - Update "What is next" with the next task
   - HAND OFF to the next task

5. If there are parallel tasks still in progress, do NOT archive
   their trackers — only archive the completed one.

EOF

if [ -n "$ACTIVE_TASKS" ]; then
    echo "Currently active task trackers:"
    for f in $ACTIVE_TASKS; do
        echo "  - docs/active/$f"
    done
else
    echo "No active task trackers found in docs/active/"
fi

echo ""
echo "═══════════════════════════════════════════════════"
