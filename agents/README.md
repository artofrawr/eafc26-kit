# Agent Definitions

This directory contains tool-agnostic agent definitions for the EA FC 26 Kit project. These definitions are written in markdown format and can be used with any agentic coding tool (Cursor, Codex, Claude Code, etc.).

## Agent Roles

1. **Frontend Agent** (`frontend-agent.md`)
   - Responsible for Next.js control panel development
   - UI/UX implementation with shadcn/ui
   - Client-side state management

2. **Backend Agent** (`backend-agent.md`)
   - Responsible for NestJS API development
   - Database integration with Prisma
   - API endpoint design and implementation

3. **EA FC Agent** (`ea-fc-agent.md`)
   - Responsible for EA FC companion app interactions
   - Selenium WebDriver automation
   - Web scraping and data extraction

4. **Testing Agent** (`testing-agent.md`)
   - Responsible for writing and maintaining tests
   - Unit tests and E2E tests
   - Test infrastructure setup

5. **Architecture Agent** (`architecture-agent.md`)
   - Responsible for system design and architecture decisions
   - Code structure and patterns
   - Technical planning

6. **Project Manager Agent** (`project-manager-agent.md`)
   - Responsible for project coordination
   - Task planning and prioritization
   - Cross-agent communication

## Usage

When working on a specific area of the codebase, refer to the relevant agent definition for:

- Technology stack knowledge
- Code patterns and conventions
- Interaction protocols with other agents
- Best practices and guidelines

## Tool Compatibility

These definitions are designed to be tool-agnostic. They work with:

- Cursor IDE
- GitHub Copilot / Codex
- Claude Code
- Any other agentic coding tool that can read markdown
