# ClusterForge v10 — Google sign-in and saved training progress

## Firebase setup (required to enable sign-in)
1. Open https://console.firebase.google.com/ and create a Firebase project.
2. Project settings > Your apps > Add Web app. Copy the public `firebaseConfig` fields into `firebase-config.js`.
3. Build > Authentication > Get started > Sign-in method > Google > Enable; select support email and Save.
4. Authentication > Settings > Authorized domains: add `YOUR_GITHUB_USERNAME.github.io` (domain only, no path).
5. Build > Firestore Database > Create database > Production mode. Choose a region.
6. Firestore Database > Rules: replace with the contents of `firestore.rules`, then Publish. Do not leave test-mode open rules.
7. Upload the app files including `cloud.js` and `firebase-config.js` to the root of your GitHub Pages repo; do not upload service-account credentials. You can keep `firestore.rules` and this README in the repository.
8. Commit, wait for GitHub Pages, hard refresh, sign in, complete a lab, finish an exam, then test in another browser signed into the same Google account.

## Behavior
- Guest mode: completion badges and exam history save in localStorage.
- Google sign-in: Firestore syncs unique lab completions and up to the 100 most recent exam records for display, and saves new exams by stable attempt ID.
- Completing a fault lab marks it complete; retaking it keeps its completed badge.
- Each mock exam result saves date, question score, lab score, overall score, pass/fail, per-domain breakdown, lab breakdown and hint counts.
- Existing guest progress is imported on first sign-in; different signed-in accounts are isolated when switching accounts.
- Firebase must be configured by the project owner; this ZIP does not include credentials or a live backend.
- All scoring is browser-side and therefore not tamper-resistant. Do not use for proctored certification or high-stakes credentials.
- Google sign-in uses popup authentication for GitHub Pages; on iPhone open in Safari if the Home Screen PWA blocks popups. Redirect auth requires additional setup on some browsers.
- An active mock exam remains local to its originating device; finished results sync across devices.

## Testing
`node --check app.js` and `node --check cloud.js` validate syntax. Actual Google sign-in and Firestore writes require your Firebase project and should be tested after setup.
