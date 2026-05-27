# Engineering Lead Assessment: Implementation Plan

I have generated task list was generated using a Gemini custom Gem from the provided technical challenge document.

I asked Gemini to provide some general guidance and not make any specific decisions other than those outlined explicitly in the document.

My implementation is my own, and Gemini was used to ensure that I do not miss any details of the assessment criteria.

## Phase 0: Workspace Setup

1. **Initialize Workspace**: Set up a `pnpm` workspace to coordinate the monorepo containing the Node.js backend and React frontend (as requested).
2. **TypeScript & Tooling**: Establish baseline TypeScript configurations and linting/formatting rules across the workspace to ensure consistency.

## Phase 1: Data Modeling

1. **Define the Gym Domain Object**: Create a sufficiently complex data object to make filtering and sorting meaningful.
   - _Considerations_: Include fields that support text search, exact match filtering, and multi-select filtering.
2. **Define API Contracts**: Establish the shared types for the API responses, including a consistent error shape across endpoints.

## Phase 2: Backend API (Node.js)

1. **Server Setup**: Initialize the Node API.
2. **Data Source**: Create an in-memory collection, JSON fixture, or equivalent for the gym records, as no persistence layer is required.
3. **The Filter Pipeline**:
   - Architect a composable query object or filter pipeline.
   - Ensure efficient data access without repeated lookups per item.
   - Implement text-search across multiple fields.
   - Implement a handful of filters and at least one multi-select.
   - Implement sorting on any allowed column.
   - Implement pagination (cursor or offset) and justify the choice.
4. **Endpoints**:
   - An endpoint to return and filter the list of gym records.
   - An endpoint responsible for mutating a gym record.

## Phase 3: React UI (Vite + TypeScript)

1. **App Setup**: Initialize the frontend using Vite, TypeScript, and React 18 or 19.
2. **State & Fetching Strategy**: Decide how to effectively manage state, search, filtering, and fetching.
3. **Component Architecture**:
   - Build a clean, reusable, componentized UI with sensible abstraction boundaries.
   - Ensure performant rendering by memoizing where it counts and avoiding unnecessary re-renders.
4. **Type Safety**: Ensure the application is type-safe end to end, across props, hooks, and API responses.
5. **Async UI States**: Design and implement all async states, including loading, empty, error, and the happy path.

## Phase 4: Architecture & AI Design (Diagrams)

1. **Production Architecture**:
   - Create one diagram using draw.io, Excalidraw, or Mermaid.
   - Outline a cloud-agnostic deployment for both the API and UI.
   - Outline a CI/CD pipeline (build, test, ship).
   - Make the case for containerization (Dockerizing it).
   - Justify the stack choices: compute model, managed data services, CDN/edge, secrets, and observability.
   - Explain how the system scales, fails, and gets observed.
2. **Introduce Agentic AI**:
   - Show where the agent lives in the architecture.
   - Define the runtime model (synchronous, queued, or long-running workflow).
   - Outline guardrails, retries, cost ceilings, and tool-use auditing.
   - Detail failure modes to plan for from day one.

## Phase 5: Deliverables & Polish

1. **Code Documentation**: Draft `NOTES.md` to explain your thinking on the code, trade-offs made, and what you would do next if you ran out of time.
2. **Submission**: Upload the solution to a public GitHub repository and ensure all deliverables are present.

---

## Validation Checklist

### Backend

- [x] API is built with Node.js.
- [x] Data layer uses an in-memory collection or JSON fixture (no persistence layer).
- [x] Filtering engine includes text-search across multiple fields.
- [x] Filtering engine includes a handful of filters.
- [x] Filtering engine includes at least one multi-select filter.
- [x] Sorting works on any allowed column.
- [x] Pagination (cursor or offset) is implemented and justified.
- [x] Architecture utilizes a composable query object or filter pipeline.
- [x] Data access is efficient (no repeated lookups per item).
- [x] Error shape is consistent across endpoints.
- [x] Includes capability to mutate a gym record. (may be optional)

### Frontend

- [x] Built with Vite, TypeScript, and React 18 or 19.
- [x] Effectively manages state, search, filtering, and fetching.
- [x] Code is clean, reusable, and componentized.
- [x] Application is type-safe end to end.
- [x] Rendering is performant (memoized where appropriate).
- [x] All async states (loading, empty, error, happy path) are designed and handled.

### Architecture & Deliverables

- [x] Architecture diagram is provided in draw.io, Excalidraw, or Mermaid format.
- [x] Diagram and notes cover deployment, CI/CD, and Dockerization.
- [x] Stack choices (compute, data, CDN, secrets, observability) are justified.
- [x] Scaling, failure, and observability strategies are addressed.
- [x] Agentic AI integration is detailed (runtime model, guardrails, failure modes).
- [x] `NOTES.md` is included and concise.
- [x] Solution is uploaded to a public GitHub repository.
