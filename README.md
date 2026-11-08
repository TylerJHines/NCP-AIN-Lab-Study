# ClusterForge v1

Original, educational, simulated AI infrastructure operations PWA. Not affiliated with NVIDIA. No actual systems are accessed.

## Run locally

From this folder, run `python -m http.server 8080`, then open `http://localhost:8080` in your browser. Python 3 is required. Avoid opening index.html via file:// because service workers require HTTP localhost or HTTPS.

## Install on iPhone

Host the contents of this directory on an HTTPS static host (such as GitHub Pages). In Safari, open the hosted URL, choose Share > Add to Home Screen. Android browsers can use Install app / Add to Home screen. PWA install behavior varies by browser and OS.

## Features

- Stateful simulated Slurm, Kubernetes, BCM cmsh and Linux command subsets
- Three fault scenarios and command-driven recovery
- Command academy with 25 entries
- Starter question bank of 12 original questions (NOT yet four complete exams)
- Local browser persistence and offline cached assets

## Scope and limitations

- BCM `provision NODE` is explicitly a *training shortcut*, not a literal production cmsh command.
- The emulator implements a deliberately small subset of real command syntax and simplified scheduler behavior.
- No real GPUs, Linux commands, clusters, or cloud services are accessed.
- No account sync or server-side progress storage.
- The four complete 30-question practice exams are a future milestone.
- Do not treat simulated command output as authoritative production documentation.

## Development

Edit app.js for the simulator logic and questions, style.css for presentation. Change the cache name in sw.js when deploying updated versions to refresh offline assets.
