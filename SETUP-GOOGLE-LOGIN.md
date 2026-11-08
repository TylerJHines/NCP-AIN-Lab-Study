# Google sign-in setup for Tyler's NCP-AIO Practice Sim and Mock Exam

**IMPORTANT:** This download deliberately has blank Firebase settings. If your current deployed `firebase-config.js` has your real public Firebase web config, **keep that file** instead of overwriting it with the blank template.

1. Firebase Console → Project settings → General → Your apps → Web app → SDK setup and configuration. Copy the public config values to `firebase-config.js`. The web `apiKey` is not an admin secret; NEVER use a service-account key in the site.
2. Authentication → Sign-in method → Google → Enable and Save.
3. Authentication → Settings → Authorized domains → add the hostname of your GitHub Pages site, e.g. `YOUR_USERNAME.github.io`, without protocol or repository path. If using a custom domain, add it too.
4. Firestore Database → Rules → publish the supplied `firestore.rules`.
5. Upload the complete updated site to GitHub Pages root, including `cloud.js`, `firebase-config.js`, `app.js`, `index.html`, `style.css`, `sw.js`. Wait for deployment.
6. Open in a new private browsing window. The top bar should say `Guest mode · Google sign-in ready`. If it instead says configuration missing, inspect the deployed `firebase-config.js`. If initialization failed, inspect browser Console/Network and the visible message.
7. Click Sign in with Google. If the popup is blocked, allow popups and test in a regular browser (not iOS Home Screen standalone). If it says unauthorized-domain, fix step 3.
8. Complete a fault lab and a mock exam, then inspect Firestore under `users/{uid}/labs` and `users/{uid}/exams`.

**Security:** Keep Firestore access restricted to each authenticated user's UID. Google sign-in requires network access to Firebase and an authorized website domain. Scores are generated client-side and not tamper-proof.

**Note:** Google popup sign-in is not guaranteed in iPhone standalone PWA mode. Use Safari first. Supporting reliable standalone redirect authentication on a GitHub Pages custom domain can require a Firebase-compatible auth helper or hosting change.
