# Setup and Run Plan

The goal is to get the "Ocean Club Reconstruction" 3D visualization app running locally.

## Proposed Changes

No code changes are required initially. The focus is on environment setup.

### Setup
1.  **[NEW]** Install Node.js using `winget`.
2.  Install dependencies using `npm install`.
2.  (Optional) Create `.env.local` if strictly required, but code analysis suggests it's not needed for the core visualization.

## Verification Plan

### Automated Tests
- None available in the repo.

### Manual Verification
1.  Run `npm run dev`.
2.  Open the local URL (usually `http://localhost:5173`).
3.  Verify the 3D scene loads:
    -   Check if the "Ocean Club Reconstruction" header is visible.
    -   Check if the 3D model (Block 5, Pool, Tapas Bar) is rendered.
    -   Test controls:
        -   Toggle Roof.
        -   Change Time of Day slider.
        -   Switch Views (Overview, Pool View, etc.).
