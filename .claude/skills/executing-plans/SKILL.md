---
name: executing-plans
description: |
  Executes implementation plans from markdown files step by step, autonomously.
  Use this skill whenever the user says things like "execute the plan", "implement the plan",
  "run the plan", "execute tasks from the plan", or points to a plan markdown file and asks
  to implement it. Also trigger when the user says "2" or "inline execution" after being
  offered execution options by the writing-plans skill.
  
  This skill runs autonomously: it reads code, writes files, runs TypeScript checks,
  and commits after each task — without asking for confirmation. It only pauses when
  the user must take an action in an external system (Supabase dashboard, cloud console,
  deploy panel, etc.).
---

# Executing Plans

You are executing an implementation plan autonomously. Your job is to work through every task in the plan file from top to bottom, completing each step without asking for permission on code changes.

## Core principle: autonomous execution

The user has already reviewed and approved this plan. They don't want to be consulted on individual code decisions — they want the plan executed. Work independently. Make judgment calls. Only stop when the user physically must do something you cannot do (click in a browser, paste into a dashboard, configure a secret in a cloud console).

## How to execute

### 1. Read the plan

Read the full plan file before starting. Understand the complete scope — what gets created, what gets modified, in what order, and what depends on what.

### 2. Execute each task in sequence

For each task in the plan:

- Read every step carefully before executing
- Write or modify files exactly as specified
- When the plan shows complete code, use it — don't rewrite or simplify
- After all file changes in a task: run `npx tsc --noEmit` to verify TypeScript
- If TypeScript passes: commit with the message shown in the plan's commit step
- If TypeScript fails: fix the errors (do not ask — just fix them), then commit

### 3. Mark steps as you go

As you complete each step, update the plan file to check it off:
- `- [ ] Step N: ...` → `- [x] Step N: ...`

Commit the plan file update together with the task's code changes (not as a separate commit).

### 4. The only time you stop

Pause and inform the user when a step requires them to act in an **external system**:
- Running SQL in Supabase SQL Editor / any database dashboard
- Deploying an Edge Function or serverless function via a web panel
- Configuring environment variables or secrets in a cloud console
- Any browser-based action in a third-party service

When you hit one of these steps:
1. Show the exact SQL / code / config they need to paste
2. Tell them exactly where to go and what to do (step by step, simple language)
3. Wait for them to confirm ("done", "feito", "ok", "já fiz")
4. Then continue immediately

Never pause for:
- Writing new files
- Editing existing files
- Running terminal commands (npm, git, tsc, etc.)
- Making architectural or implementation decisions within the scope of the plan

### 5. After every task

After each task completes successfully:
- Confirm completion in one line: "✅ Task N complete — [what was built]"
- Move immediately to the next task

### 6. After the full plan

When all tasks are done:
- Run `npm run build` to verify the production build
- Report any remaining manual actions the user needs to take (deploy, SQL, secrets)
- Summarize what was built

## Handling errors

**TypeScript errors:** Fix them inline. The plan's code may have minor issues — use your judgment to resolve them consistently with the codebase's existing patterns. Don't ask.

**File conflicts:** If a file already has partial content from a previous run, read it first, then apply the changes correctly. Don't overwrite work that's already done.

**Ambiguous steps:** If a plan step is genuinely ambiguous, pick the interpretation most consistent with the surrounding code and the codebase's existing patterns. Document your choice in the commit message if it's non-obvious.

**Pre-existing errors:** If `npx tsc --noEmit` fails on code that the current task didn't touch, fix those errors too before committing. A clean TypeScript build is the goal.

## What "autonomous" means in practice

You write code. You don't ask "should I add error handling?" — you add it if the plan specifies it. You don't ask "is this the right approach?" — the plan was approved. You don't ask "want me to continue?" between tasks — you continue.

The plan is the contract. Execute it.
