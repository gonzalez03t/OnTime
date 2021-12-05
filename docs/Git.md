# Git

This will overview our general git workflow. You may follow it if you'd like.

## Branches

We have 2 consistent branches, and then follow a generalized structure for feature/other branches:

    * main
    * development
    * feature/<feature-name> OR <feature-name-or-desc>
    * bug/<bug-name> OR <bug-name-or-desc>
    * conflict-fix/<to-branch-from-branch>

## Issue Tracking / Scrum Board

We have used GitHub Projects to track our features/stories as issues. Issues are assigned to a [Project](https://github.com/medapt/ontime/projects/1), a sprint (represented as a [Milestone](https://github.com/medapt/ontime/milestones)) and a label to categorize them:

    * frontend
    * backend
    * backlog
    * blocked
    * bug
    * testing
    * documentation

Our scrum board has the following columns:

    - Unassigned (To-do)
    - Backlog / Blocked - issues that have not been completed during their sprint or are blocked
    - Ready for Work - issues that are part of the current sprint
    - In Progress - issues being worked on
    - Ready for Merge - issues that have open PR's
    - Done - yay

## Pull Requests

Once a feature is completed, we make a PR to the development branch. If it passes a **review by another team member**, and passes GitHub's conflict checks, It gets merged. After every sprint, we merge the development branch into the main branch.

We used specific keywords in PRs to link issues to PRs. For example, if we have an issue `#1` called `Create an awesome documentation section`, we give the PR a title like `PR for #1: Documentation Section` and a body that contains `Closes #1`. This _should_ be enough for GitHub to link the issue and PR.
