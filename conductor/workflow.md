# Workflow

## Swarm Orchestration
All tasks are orchestrated by the Swarm Orchestrator extension.
1.  **Analyze:** `/swarm:plan`
2.  **Assign:** `@gemini_worker` (Implementation) or `@claude_worker` (Architecture).
3.  **Validate:** `/swarm:run`

## Development Cycle
1.  **Spec:** Define the task clearly in `plan.md`.
2.  **Test:** Write a failing test or define the expected behavior.
3.  **Implement:** Write the code to pass the test.
4.  **Refactor:** Clean up and optimize.

## Commit Strategy
- Atomic commits per task.
- Prefix: `feat:`, `fix:`, `chore:`, `docs:`.
