# ClusterForge v6 — Expanded AI Operations Labs

An original browser-based **training simulation**, not an NVIDIA exam replica or live BCM/Slurm/Kubernetes cluster.

## Contents
- 15 guided labs (3 original plus 12 expanded) with scenario checklist, `hint`, and command feedback.
- Slurm: drained node, GPU resource shortage, partition error, GRES mismatch, daemon unavailable.
- Kubernetes: image pull, taint scheduling, CrashLoopBackOff, GPU device plugin, NotReady node.
- BCM: node provisioning, incorrect software image, incorrect node category.
- GPU: Xid error triage and safe node isolation.
- Linux/storage: full shared storage.
- Command academy and existing 12-question starter quiz.

## Limitations
The simulator recognizes only a documented subset of commands. `simctl` commands are **training-only shortcuts** and must not be confused with actual NVIDIA/Slurm/Kubernetes commands. Real environments require version-specific procedures and operator authorization. Some scenarios intentionally use simplified states and exact command progression. These labs are representative preparation exercises, not confirmed exam content. Full four 30-question exams are not yet included.

## Deploy
Upload all files in this folder to the root of your GitHub Pages repository, replacing the old files. Settings > Pages > Deploy from a branch > main > /(root).

## Local run
From this folder, run `python -m http.server 8080` then open `http://localhost:8080`.

## Test
`node --check app.js` checks JavaScript syntax. Functional browser testing is recommended before publishing widely.
