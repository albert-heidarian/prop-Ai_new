---
slug: cli-artifacts
section: Antigravity CLI
title: Reviewing Artifacts
path: Antigravity CLI / Artifacts / Overview
---

# Reviewing artifacts

Audit generated code, review implementation proposals, attach line-level feedback comments, and verify visual media assets before applying edits to your local filesystem.

## Collaboration and co-steering

An **Artifact** is a structured deliverable created by the agent to accomplish its task and communicate its progress and thinking to you. Artifacts include rich markdown outlines (such as Implementation Plans), code diffs, architecture diagrams, and visual media files.

As agents work with higher autonomy over longer periods, artifacts enable asynchronous collaboration. You do not need to carefully monitor every individual tool execution synchronously. Instead, you review high-level deliverables at key milestones.

Because autonomous agents can occasionally go off-course or hallucinate solutions, the artifact workflow serves as a critical interactive co-steering mechanism. Depending on your configuration, the agent will pause at intermediate milestones, allowing you to inspect proposed plans or code edits, provide inline comments, and redirect the agent before any changes are physically written to your local filesystem.

The TUI partitions these assets into two interactive layers:

- **The Artifact Picker Overlay**: A high-level checklist menu containing review status markers, quick preview toggles, and collapsible folders.
- **The Artifact Detail Viewer**: A full-screen code audit interface supporting inline commenting, syntax highlighting, and diagram scaling.

## Overview of /artifact

When the agent produces or modifies files, a notification updates in your TUI status bar (`/artifact to review`). Press `ctrl+r` inside the prompt box to open the full-screen **Artifact Picker Panel**.

```text
                                                                                                    10 artifacts Â· /artifact to review
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
>
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Action required (10 left)
â€º â–¡ new release_notes.md   open  approve reject
  utils.py
  â–¡ new performance_report.md
  api_client.py
  config_manager.py
  â–¡ new user_guide.md
  run_tests.py
  data_processor.py
  â–¡ new system_architecture.md
  â–¡ new project_overview.md

Keyboard: â†‘/â†“ Navigate  y/n Approve/reject  shift+a Approve all  p Preview  esc Done
```

### Interaction keybindings

Audit the file checklist using the following dedicated panel controls:

| Key               | TUI Command           | Action Behavior                                                                                                                          |
| :---------------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **`â†‘`** / **`â†“`** | `nav.scroll_line`     | Scrolls highlighted selections up and down through the list of entries.                                                                  |
| **`h`** / **`l`** | `nav.switch_button`   | Focuses and toggles between inline row buttons: **open**, **approve**, and **reject** (Left/Right arrows also supported).                |
| **`p`**           | `confirm.preview`     | Toggles a **quick inline file preview**. This opens a 12-line truncated and indented code block preview directly under the selected row. |
| **`y`**           | `confirm.approve`     | Instantly approves the highlighted file. The status marker updates to a green checkmark (`âœ“ approved`).                                  |
| **`n`**           | `confirm.reject`      | Instantly rejects the highlighted file. The status marker updates to a red cross (`âœ— rejected`).                                         |
| **`Shift+A`**     | `confirm.approve_all` | Bulk-approves all pending actionable files in one action.                                                                                |
| **`Shift+R`**     | `confirm.reject_all`  | Bulk-rejects all pending actionable files in one action.                                                                                 |
| **`Enter`**       | `nav.confirm`         | Executes the active focused button. If the `open` button is focused, it launches the full-screen Detail Viewer.                          |
| **`Esc`**         | `nav.escape`          | Saves your active review state, submits approvals/rejections back to the agent thread, and returns focus to the prompt box.              |

### Code files vs visual media

To organize workspace assets, the picker separates files by format types:

- **Actionable Code Files**: Standard programming codes, configs, and plan markdowns that require explicit approvals.
- **Collapsible Media Drawer**: Visual asset files (such as PNG, JPG, WebP, SVG, MP4, or WebM media) are grouped into a dedicated **"Media"** drawer header.
  - Highlight the **Media** header row and press `Enter` to expand or collapse the drawer list.
  - Highlight a specific media item and press `Enter` to open the file inside your operating system's native media viewer.

---

## Viewing an artifact

To launch a close audit of a fileâ€™s code structure or proposed logic, select `open` (or press `Enter` directly on a highlighted code row) to open the **Artifact Detail Viewer**.

```text
implementation_plan.md
>   1      Implementation Plan: Alpha-Centauri Telemetry Scaling Engine
    2
    3     This document provides a highly detailed, step-by-step engineering implementation plan to upgrade the Alpha-Centauri
    4     telemetry ingestion pipeline. It outlines current gaps, proposed architecture improvements, execution timelines, risks,
    5     and verification procedures.
    6     â”€â”€â”€â”€â”€â”€
    7     ## 1. Executive Summary
    8
    9     As sensor deployments scale from 100 to 10,000 active nodes, the existing synchronous Python-based ingestion system (
   10     data_processor.py ) faces critical CPU and write latency bottlenecks.
   11
   12     This implementation plan details the migration to an asynchronous, remote-buffered pipeline utilizing distributed
   13     message
   14     queues, multi-threaded worker pools, and an optimized column-oriented storage layer.
   15     â”€â”€â”€â”€â”€â”€
   16     ## 2. Current Architecture vs. Target Architecture
   17
   18     ### Gap Analysis
   19
   20      Feature    | Existing (v1.2)   | Target (v2.0)     | Gap to Resolve
   21     ------------|-------------------|-------------------|---------------------------
   22      Concurrency| Sync, 1-thread    | Async, concurrent | Cannot scale peak bursts
   23      Buffer     | None (direct API) | Message Queue     | Outage data loss
   24      Storage    | Flat JSON         | Columnar CNS      | Slow queries, high consumption
   25      Config     | Load on launch    | Dynamic polling   | Requires restarts to update
   26
   27     ### Architectural Schema
   28
   29         Ingestion Layer â”‚ Buffering Layer â”‚ Processing Layer â”‚ Storage Layer
   30
   31         â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
   32         â”‚ "Sensor 1" â”‚    â”‚ "Sensor 2" â”‚
   33         â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
   34                â”‚ HTTP POST           â”‚ HTTP POST
   35                â–¼                 â–¼
   36         â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
   37         â”‚ "Load Balancer" â”‚
   38         â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
   39                  â”‚
   40                  â–¼
   41         â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
   42         â”‚ "Ingestion Gateway A" â”‚    â”‚ "Ingestion Gateway B" â”‚
   43         â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
   44                     â”‚ Publish                    â”‚ Publish
   45                     â–¼                            â–¼
   46         â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
   47         â”‚ "Distributed Message Queue" â”‚
   48         â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
   49                        â”‚ Stream Consume
   50                        â–¼
   51         â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
   52         â”‚ "Worker Process 1" â”‚    â”‚ "Worker Process 2" â”‚
   53         â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
   54                    â”‚ Read Config               â”‚ Read Config
   55                    â–¼                         â–¼
   56         â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
   57         â”‚ "Dynamic Config Service" â”‚    â”‚ "Columnar Storage (CNS)" â”‚
  [0%  L1  1-57/135]

  â†‘/â†“ scroll Â· pgup/pgdown page Â· shift+g bottom Â· g top Â· c comment Â· m raw mermaid Â· ctrl+=/ctrl+- zoom 100%
  l hide lines Â· esc close
```

### Auditing & navigation

- **Scrolling**: Scroll page-by-page or line-by-line using `j`/`k` (or standard arrow keys).
- **Boundary Jump**: Press `g` to jump to the top of the file, and `Shift+G` to jump directly to the bottom.
- **Toggle Gutter**: Press `l` to toggle the line number gutter on and off for a cleaner presentation of the raw code.

### Granular line commenting

If a specific block of code requires correction:

1.  Navigate and position your cursor on the target line.
2.  Press `c` to open an inline, multi-line text editor buffer attached directly to that line.
3.  Draft your descriptive feedback, and press `Esc` to save and submit the comment. The line is updated with a visual comment indicator (`ðŸ’¬`).
4.  To delete your active feedback, position your cursor on the commented line and press `d`.

### Custom Mermaid diagram rendering

If the active document contains structured system flowcharts, database relationships, or architectural layouts:

- **Cycle Render Modes (`m`)**: Press `m` to cycle visual rendering modes:
  - **Kitty Graphics Image**: Renders diagrams natively as inline graphics within Kitty-compatible terminal emulators.
  - **ASCII Box Art** (Default): Renders diagrams as clean, high-performance text art compatible with all shells.
  - **Raw Code**: Shows the raw markdown code block fences.
- **Zooming Graphics**: When Kitty graphics image mode is active, press `ctrl+=` to zoom in and scale up the image, and `ctrl+-` to zoom out.

Press `Esc` to close the Detail Viewer and return back to the primary picker checklist.

## Next steps

Configure settings preferences and review agent autonomy parameters:

- **[Managing Conversations](/docs/cli-conversations)**: Resume prior sessions and fork branches.
- **[Settings, Rendering & Keybindings](/docs/cli-settings)**: Customize keyboard hotkeys and visual buffers.
- **[Permissions & Sandbox](/docs/cli-sandbox)**: Configure security parameters and containment lists.
