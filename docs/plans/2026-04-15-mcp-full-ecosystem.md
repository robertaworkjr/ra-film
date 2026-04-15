# RA-Film MCP Full Ecosystem Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan phase-by-phase.

**Goal:** Wire up GitHub CI/CD, Google Sheets contact form backend, Gmail notifications, and a Flutter companion app using the three MCP servers already installed (github-mcp-server, StitchMCP, dart-mcp-server).

**Architecture:**
- Phase 1 — GitHub: push site to GitHub, protect main branch, set up Vercel CI/CD auto-deploy
- Phase 2 — Contact Form: Next.js API route posts to Google Sheets via Stitch MCP, sends Gmail notification
- Phase 3 — Flutter App: companion mobile app (portfolio viewer, 360 panorama viewer, showreel) using Dart MCP tooling
- Phase 4 — Hermes MCP Config: wire all 3 servers into ~/.hermes/config.yaml for direct agent tool use

**Tech Stack:** Next.js 16 (App Router), TypeScript, Three.js, Flutter 3.41 / Dart 3.11, GitHub Actions, Vercel, Google Sheets API (via Stitch MCP), Gmail API (via Stitch MCP)

---

## PHASE 1 — GitHub + CI/CD

### Task 1.1: Fix .gitignore and prepare repo for push

**Objective:** Ensure .env.local, .next/, node_modules, and large video files are excluded before first push.

**Files:**
- Modify: `.gitignore`

**Step 1: Update .gitignore**

```
# dependencies
/node_modules

# next.js
/.next/
/out/

# env files
.env
.env.local
.env.*.local

# large media (tracked via Git LFS or excluded)
*.mp4
*.mov
*.webm
public/videoRA/
public/3DObjects/*.glb

# OS
.DS_Store
*.tsbuildinfo
```

**Step 2: Verify nothing sensitive is staged**

Run: `git status --short`
Expected: only source files, no .env.local, no node_modules

**Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: update gitignore for Next.js + media files"
```

---

### Task 1.2: Authenticate GitHub CLI

**Objective:** Log gh CLI in with the robertaworkjr GitHub account.

**Step 1: Authenticate**

```bash
gh auth login --hostname github.com --git-protocol https --web
```

Follow the browser OAuth flow. When asked for scopes, select repo + workflow.

**Step 2: Verify**

```bash
gh auth status
```
Expected: Logged in to github.com as robertaworkjr

---

### Task 1.3: Create GitHub repo and push

**Objective:** Create ra-film repo under robertaworkjr and push all code.

**Step 1: Create repo**

```bash
cd /Users/kalilinux/Downloads/ra-film
gh repo create robertaworkjr/ra-film --public --description "RA-Film portfolio — Next.js, Three.js, 360 panorama, AI artwork" --source=. --remote=origin --push
```

**Step 2: Verify**

```bash
gh repo view robertaworkjr/ra-film
```
Expected: repo exists with all files

---

### Task 1.4: Protect main branch

**Objective:** Require PR reviews before merging to main, enable status checks.

**Step 1: Set branch protection via gh API**

```bash
gh api repos/robertaworkjr/ra-film/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["build"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1}' \
  --field restrictions=null
```

**Step 2: Verify**

```bash
gh api repos/robertaworkjr/ra-film/branches/main/protection | grep required
```

---

### Task 1.5: Add GitHub Actions CI workflow

**Objective:** Run build + lint on every PR and push to main.

**Files:**
- Create: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build
    env:
      OPENROUTER_API_KEY: ${{ secrets.OPENROUTER_API_KEY }}
```

**Step 2: Add OPENROUTER_API_KEY to GitHub secrets**

```bash
gh secret set OPENROUTER_API_KEY --body "$(grep OPENROUTER_API_KEY /Users/kalilinux/Downloads/ra-film/.env.local | cut -d= -f2)"
```

**Step 3: Commit and push**

```bash
git add .github/
git commit -m "ci: add GitHub Actions build + lint workflow"
git push
```

**Step 4: Verify**

```bash
gh run list --repo robertaworkjr/ra-film
```
Expected: first run appears and passes

---

### Task 1.6: Deploy to Vercel via GitHub integration

**Objective:** Connect Vercel to the GitHub repo for auto-deploy on every push to main.

**Step 1: Install Vercel CLI if not present**

```bash
npm i -g vercel
```

**Step 2: Link and deploy**

```bash
cd /Users/kalilinux/Downloads/ra-film
vercel --yes
```

Follow prompts: link to robertaworkjr account, project name ra-film, auto-detect Next.js framework.

**Step 3: Add env vars to Vercel**

```bash
vercel env add OPENROUTER_API_KEY production
# paste the key when prompted
```

**Step 4: Trigger a deploy**

```bash
vercel --prod
```

**Step 5: Verify**

```bash
vercel ls
```
Expected: ra-film deployment with production URL (e.g. ra-film.vercel.app)

---

## PHASE 2 — Contact Form → Google Sheets + Gmail

### Task 2.1: Create the Contact form API route

**Objective:** Add POST /api/contact that receives name/email/message and forwards to Google Sheets + sends Gmail.

**Files:**
- Create: `app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const errors: string[] = []

  // 1. Append to Google Sheet
  try {
    await appendToSheet({ name, email, message })
  } catch (e) {
    errors.push('sheet: ' + String(e))
  }

  // 2. Send Gmail notification
  try {
    await sendGmailNotification({ name, email, message })
  } catch (e) {
    errors.push('email: ' + String(e))
  }

  if (errors.length > 0) {
    console.error('Contact form errors:', errors)
    return NextResponse.json({ ok: false, errors }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

async function appendToSheet(data: { name: string; email: string; message: string }) {
  const spreadsheetId = process.env.CONTACT_SHEET_ID!
  const range = 'Sheet1!A:D'

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [[new Date().toISOString(), data.name, data.email, data.message]],
      }),
    }
  )
  if (!response.ok) throw new Error(await response.text())
}

async function sendGmailNotification(data: { name: string; email: string; message: string }) {
  const to = process.env.NOTIFICATION_EMAIL!
  const subject = `New contact from ${data.name} — RA-Film`
  const body = `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`

  // Gmail API requires base64url encoded RFC 2822 message
  const raw = btoa(
    `To: ${to}\r\nSubject: ${subject}\r\nContent-Type: text/plain\r\n\r\n${body}`
  ).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  })
  if (!response.ok) throw new Error(await response.text())
}
```

---

### Task 2.2: Wire up Google OAuth via Stitch MCP

**Objective:** Use Stitch MCP to get a Google OAuth access token with Sheets + Gmail scopes, store it in .env.local.

**Step 1: Configure Stitch MCP in Hermes**

Add to `~/.hermes/config.yaml` under `mcp_servers`:

```yaml
mcp_servers:
  stitch:
    command: npx
    args:
      - -y
      - mcp-remote
      - https://stitch.googleapis.com/mcp
      - --header
      - "X-Goog-Api-Key: <STITCH_API_KEY>"
    timeout: 60
```

**Step 2: Restart Hermes and discover tools**

After restarting, run: `mcp_stitch_*` tools will be available.

**Step 3: Create a Google Sheet for contact form submissions**

Via Hermes with the Stitch MCP:
- Create a new Google Sheet named "RA-Film Contacts"
- Note the spreadsheet ID from the URL

**Step 4: Add env vars to .env.local**

```
CONTACT_SHEET_ID=<spreadsheet_id_from_step_3>
NOTIFICATION_EMAIL=<your_gmail_address>
GOOGLE_ACCESS_TOKEN=<oauth_token_from_stitch>
```

Note: For production, implement proper OAuth refresh flow. Access tokens expire in 1 hour.

---

### Task 2.3: Update the Contact component to call the API

**Objective:** Wire the existing Contact.tsx form to POST to /api/contact.

**Files:**
- Modify: `components/Contact.tsx`

Find the form's submit handler and replace with:

```typescript
const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  setStatus('sending')
  const form = e.currentTarget
  const data = {
    name: (form.elements.namedItem('name') as HTMLInputElement).value,
    email: (form.elements.namedItem('email') as HTMLInputElement).value,
    message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
  }
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      setStatus('sent')
      form.reset()
    } else {
      setStatus('error')
    }
  } catch {
    setStatus('error')
  }
}
```

Add visual feedback below the submit button:
```tsx
{status === 'sending' && <p style={{color: '#d4af37'}}>Sending...</p>}
{status === 'sent' && <p style={{color: '#d4af37'}}>Message sent. We'll be in touch.</p>}
{status === 'error' && <p style={{color: '#ff4444'}}>Something went wrong. Try again.</p>}
```

**Step 2: Test locally**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello"}'
```
Expected: `{"ok":true}`

**Step 3: Commit**

```bash
git add app/api/contact/ components/Contact.tsx
git commit -m "feat: contact form with Google Sheets + Gmail notification"
git push
```

---

## PHASE 3 — Flutter Companion App

### Task 3.1: Scaffold Flutter app with Dart MCP

**Objective:** Create ra-film-app Flutter project alongside the web repo.

**Files:**
- Create: `/Users/kalilinux/Downloads/ra-film-app/` (new Flutter project)

**Step 1: Configure Dart MCP in Hermes**

Add to `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  dart:
    command: dart
    args: [mcp-server]
    timeout: 60
```

**Step 2: Create Flutter project**

```bash
cd /Users/kalilinux/Downloads
flutter create ra_film_app --org space.contentAgent --platforms ios,android,macos
cd ra_film_app
```

**Step 3: Add dependencies to pubspec.yaml**

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.0
  video_player: ^2.9.2
  panorama: ^0.4.1       # 360 equirectangular viewer
  cached_network_image: ^3.4.1
  go_router: ^14.2.7
  google_fonts: ^6.2.1
```

Run: `flutter pub get`

---

### Task 3.2: App structure and navigation

**Objective:** Set up go_router with 4 screens: Portfolio, Showreel, 360 Viewer, Contact.

**Files:**
- Create: `lib/main.dart`
- Create: `lib/router.dart`
- Create: `lib/screens/portfolio_screen.dart`
- Create: `lib/screens/showreel_screen.dart`
- Create: `lib/screens/panorama_screen.dart`
- Create: `lib/screens/contact_screen.dart`
- Create: `lib/theme.dart`

**lib/theme.dart** — match RA-Film gold + dark palette:

```dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class RAFilmTheme {
  static const gold = Color(0xFFD4AF37);
  static const dark = Color(0xFF0A0A0A);
  static const darkCard = Color(0xFF1A1A1A);

  static ThemeData get theme => ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: dark,
    colorScheme: const ColorScheme.dark(primary: gold, surface: darkCard),
    textTheme: GoogleFonts.montserratTextTheme(ThemeData.dark().textTheme),
    appBarTheme: const AppBarTheme(backgroundColor: dark, foregroundColor: gold),
  );
}
```

**lib/router.dart:**

```dart
import 'package:go_router/go_router.dart';
import 'screens/portfolio_screen.dart';
import 'screens/showreel_screen.dart';
import 'screens/panorama_screen.dart';
import 'screens/contact_screen.dart';

final router = GoRouter(routes: [
  GoRoute(path: '/', builder: (ctx, state) => const PortfolioScreen()),
  GoRoute(path: '/showreel', builder: (ctx, state) => const ShowreelScreen()),
  GoRoute(path: '/360', builder: (ctx, state) => const PanoramaScreen()),
  GoRoute(path: '/contact', builder: (ctx, state) => const ContactScreen()),
]);
```

---

### Task 3.3: Portfolio screen — gallery of work

**Objective:** Grid of RA-Film work categories (Film, 360, AI Art, Drone, 3D) pulling from a hardcoded manifest.

**Files:**
- Create: `lib/screens/portfolio_screen.dart`
- Create: `lib/data/portfolio_data.dart`

**lib/data/portfolio_data.dart:**

```dart
class PortfolioItem {
  final String title;
  final String category;
  final String thumbnailUrl;
  final String route;

  const PortfolioItem({
    required this.title,
    required this.category,
    required this.thumbnailUrl,
    required this.route,
  });
}

const portfolioItems = [
  PortfolioItem(
    title: 'Showreel 2025',
    category: 'Film',
    thumbnailUrl: 'https://ra-film.vercel.app/images/showreel-thumb.jpg',
    route: '/showreel',
  ),
  PortfolioItem(
    title: '360 Experiences',
    category: '360 Film',
    thumbnailUrl: 'https://ra-film.vercel.app/images/360-thumb.jpg',
    route: '/360',
  ),
];
```

---

### Task 3.4: 360 Panorama viewer screen

**Objective:** Full-screen gyroscope/drag-controlled 360 viewer using the `panorama` package.

**Files:**
- Create: `lib/screens/panorama_screen.dart`

```dart
import 'package:flutter/material.dart';
import 'package:panorama/panorama.dart';

class PanoramaScreen extends StatelessWidget {
  const PanoramaScreen({super.key});

  // Update these URLs to point to deployed Vercel images
  static const panoImages = [
    'https://ra-film.vercel.app/images/360RA/pano1.jpg',
    'https://ra-film.vercel.app/images/360RA/pano2.jpg',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(title: const Text('360° Experience')),
      body: Panorama(
        child: Image.network(panoImages[0]),
        sensitivity: 2.0,
        animSpeed: 1.0,
      ),
    );
  }
}
```

---

### Task 3.5: Contact screen calling the live API

**Objective:** Flutter form that POSTs to the deployed Vercel /api/contact endpoint.

**Files:**
- Create: `lib/screens/contact_screen.dart`

```dart
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../theme.dart';

class ContactScreen extends StatefulWidget {
  const ContactScreen({super.key});
  @override
  State<ContactScreen> createState() => _ContactScreenState();
}

class _ContactScreenState extends State<ContactScreen> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _message = TextEditingController();
  bool _sending = false;
  String? _result;

  // Replace with actual Vercel deployment URL
  static const _apiUrl = 'https://ra-film.vercel.app/api/contact';

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() { _sending = true; _result = null; });
    try {
      final res = await http.post(
        Uri.parse(_apiUrl),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'name': _name.text,
          'email': _email.text,
          'message': _message.text,
        }),
      );
      setState(() { _result = res.statusCode == 200 ? 'Sent!' : 'Error. Try again.'; });
    } catch (e) {
      setState(() { _result = 'Network error.'; });
    } finally {
      setState(() { _sending = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Contact')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(children: [
            TextFormField(controller: _name, decoration: const InputDecoration(labelText: 'Name')),
            TextFormField(controller: _email, decoration: const InputDecoration(labelText: 'Email')),
            TextFormField(controller: _message, maxLines: 5, decoration: const InputDecoration(labelText: 'Message')),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _sending ? null : _submit,
              style: ElevatedButton.styleFrom(backgroundColor: RAFilmTheme.gold),
              child: _sending ? const CircularProgressIndicator() : const Text('Send'),
            ),
            if (_result != null) Text(_result!, style: const TextStyle(color: RAFilmTheme.gold)),
          ]),
        ),
      ),
    );
  }
}
```

---

### Task 3.6: Build and test Flutter app

**Objective:** Verify app builds and runs on iOS Simulator and Android Emulator.

**Step 1: Check available devices**

```bash
flutter devices
```

**Step 2: Run on iOS Simulator**

```bash
cd /Users/kalilinux/Downloads/ra_film_app
flutter run -d iPhone
```

**Step 3: Build release APK**

```bash
flutter build apk --release
```
Expected: build/app/outputs/flutter-apk/app-release.apk

**Step 4: Commit Flutter app**

```bash
cd /Users/kalilinux/Downloads/ra_film_app
git init
git add .
git commit -m "feat: initial RA-Film companion app"
gh repo create robertaworkjr/ra-film-app --public --source=. --push
```

---

## PHASE 4 — Wire MCP Servers into Hermes

### Task 4.1: Add all 3 MCP servers to Hermes config

**Objective:** Make github, stitch, and dart MCP tools available directly in every Hermes session.

**File:** `~/.hermes/config.yaml` — add under top level:

```yaml
mcp_servers:
  github:
    command: docker
    args:
      - run
      - -i
      - --rm
      - -e
      - GITHUB_PERSONAL_ACCESS_TOKEN
      - ghcr.io/github/github-mcp-server
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "<your_github_pat>"
    timeout: 60

  stitch:
    command: npx
    args:
      - -y
      - mcp-remote
      - https://stitch.googleapis.com/mcp
      - --header
      - "X-Goog-Api-Key: <STITCH_API_KEY>"
    timeout: 60

  dart:
    command: dart
    args: [mcp-server]
    timeout: 60
```

**Step 2: Install mcp Python package**

```bash
pip install mcp
```

**Step 3: Verify Docker is running (for github MCP)**

```bash
docker ps
```

**Step 4: Restart Hermes**

After restart, these tools become available:
- mcp_github_create_repository
- mcp_github_create_pull_request
- mcp_github_list_issues
- mcp_github_push_files
- mcp_stitch_* (Google Sheets, Gmail, Calendar, etc.)
- mcp_dart_* (Dart analysis, pub, formatting)

---

## Execution Order

1. Phase 1 first — need the GitHub repo live and Vercel deploy URL before Flutter app can point at the API
2. Phase 2 second — contact form needs Google OAuth token from Stitch MCP
3. Phase 3 third — Flutter app uses the live Vercel URL
4. Phase 4 in parallel with any phase — just config changes, no code

## Key Dependencies

- GitHub PAT needed for Task 1.2 (gh auth login) and Task 4.1
- Google Stitch API key already known: <STITCH_API_KEY>
- Vercel account linked to robertaworkjr GitHub
- Docker must be running for github MCP server
- Flutter 3.41.2 + Dart 3.11 confirmed installed
