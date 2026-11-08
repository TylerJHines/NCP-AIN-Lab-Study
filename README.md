# ClusterForge v7 — NCP-AIO Mock Exam

Original, offline-capable, browser-based practice application. Not affiliated with NVIDIA.

## New mock exam
- 30 randomly selected, shuffled multiple-choice questions from 78 original items.
- Domain mix: 9 Installation & Deployment, 7 Administration, 7 Workload Management, 7 Troubleshooting & Optimization.
- Weighted question score: 31% / 23% / 23% / 23% (official NVIDIA domain weights).
- Three random labs: one Slurm, one Kubernetes, one BCM, drawn from 13 eligible scenarios. The 2 additional GPU/storage labs remain available in standalone practice.
- Shared 120-minute timer; questions and labs contribute 50% each.
- Equal weight for each of three labs. Each verified checklist step earns 1 point; using `hint` once or repeatedly on that step deducts 10% of the step's maximum points. Incomplete steps earn zero. The lab score is the average of the three lab percentages.
- Overall score = 0.5 * weighted question score + 0.5 * average lab score. 70% is a **user-chosen practice benchmark**, not an NVIDIA-published passing cut score.
- Saved in localStorage per browser. Does not synchronize across devices. The timer continues after refreshing the page.

## Limitations
This is a synthetic training simulation, not the real exam environment. Some repairs use simulator-only `simctl` commands and are not valid production commands. Lab steps are command-sequence graded, not fully outcome-based. The exam questions are original practice questions, not leaked exam items. The 50/50 exam section weighting, 30 questions, three labs and 120-minute duration are published by NVIDIA; hint penalties and the 70% pass threshold are custom training rules.

## Deploy
Unzip and upload **all 7 files** into the root of your GitHub Pages repository, including app.js, style.css, sw.js and index.html. Commit changes, wait for Pages to finish, then hard-refresh. The cache version is v7 to help invalidate prior PWA assets.

## v8 hint penalties
Mock exam lab hints now deduct 50% of the current step for the first hint, 75% cumulative for the second, and 100% cumulative for the third or later. Each step is weighted equally within its lab, so penalties automatically scale with the lab's number of steps. This is a custom practice scoring policy, not a published NVIDIA grading rule. Normal guided practice remains unpenalized.

## v9 verified mock-exam hint penalties
- First `hint` on a step: **50%** of that step's credit forfeited.
- Second `hint` on the same step: **75% total** forfeited.
- Third and subsequent hints: **100%** forfeited.
- No penalty for hints in guided practice.
- Each step contributes 1/N of its lab score; three labs share the 50% hands-on section equally.
- The mock exam now uses a v9 local-storage key to avoid resuming older attempts with incompatible hint records.
- These are original training rules, **not published NVIDIA scoring rules**.
