/**
 * seed-ring.ts — Populate the Ilion ring with top GitHub users
 *
 * Usage:  npx tsx scripts/seed-ring.ts
 *
 * Requires in .env.local:
 *   GITHUB_TOKEN, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

// ── Config ───────────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const GH_TOKEN    = process.env.GITHUB_TOKEN!;

if (!SUPABASE_URL || !SUPABASE_KEY) { console.error('Missing Supabase env vars'); process.exit(1); }
if (!GH_TOKEN) { console.error('Missing GITHUB_TOKEN'); process.exit(1); }

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Ring geometry (must match index.html) ────────────────────────────────────
const ARC_S    = -Math.PI * 0.10;
const ARC_E    = Math.PI * 1.085;
const ARC_SPAN = ARC_E - ARC_S;

// 3 anchor positions: 25%, 50%, 75% of the arc
const ANCHORS = [
  ARC_S + ARC_SPAN * 0.25,   // ≈ 0.617
  ARC_S + ARC_SPAN * 0.50,   // ≈ 1.547
  ARC_S + ARC_SPAN * 0.75,   // ≈ 2.477
];

const DELAY_MS = 800; // ms between GitHub API calls (safe with token)
const TARGET_USERS = 50;

// ── GitHub helpers ───────────────────────────────────────────────────────────
const ghHeaders = {
  'Accept': 'application/vnd.github+json',
  'Authorization': `Bearer ${GH_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28',
};

async function ghFetch(url: string) {
  const res = await fetch(url, { headers: ghHeaders });
  if (!res.ok) {
    const limit = res.headers.get('x-ratelimit-remaining');
    console.error(`GitHub ${res.status} on ${url} (remaining: ${limit})`);
    throw new Error(`GitHub API ${res.status}`);
  }
  const remaining = res.headers.get('x-ratelimit-remaining');
  console.log(`  [rate-limit remaining: ${remaining}]`);
  return res.json();
}

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔍 Searching for top GitHub users by repo count...\n');

  // GitHub Search: users with most public repos
  const searchUrl = `https://api.github.com/search/users?q=repos:>500+type:user&sort=repositories&order=desc&per_page=${TARGET_USERS}`;
  const searchResult = await ghFetch(searchUrl);
  const userLogins: string[] = searchResult.items.map((u: any) => u.login);

  console.log(`Found ${userLogins.length} users. Fetching details...\n`);

  // Fetch full profile + repos for each
  interface UserData {
    login: string;
    github_id: number;
    avatar_url: string;
    public_repos: number;
    star_count: number;
    top_language: string | null;
    repo_count: number;
  }

  const users: UserData[] = [];

  for (const login of userLogins) {
    try {
      console.log(`→ ${login}`);
      const profile = await ghFetch(`https://api.github.com/users/${login}`);
      await sleep(DELAY_MS);

      const repos = await ghFetch(`https://api.github.com/users/${login}/repos?per_page=100&sort=updated`);
      await sleep(DELAY_MS);

      const starCount = Array.isArray(repos)
        ? repos.reduce((s: number, r: any) => s + (r.stargazers_count || 0), 0)
        : 0;

      const langCounts: Record<string, number> = {};
      if (Array.isArray(repos)) {
        for (const r of repos) {
          if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
        }
      }
      const topLang = Object.entries(langCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

      users.push({
        login: profile.login,
        github_id: profile.id,
        avatar_url: profile.avatar_url,
        public_repos: profile.public_repos,
        star_count: starCount,
        top_language: topLang,
        repo_count: profile.public_repos,
      });

      console.log(`   repos: ${profile.public_repos}  stars: ${starCount}  lang: ${topLang}`);
    } catch (e) {
      console.warn(`   ⚠ skipping ${login}: ${e}`);
    }
  }

  // Sort by repo count descending
  users.sort((a, b) => b.public_repos - a.public_repos);
  console.log(`\n📊 ${users.length} users fetched. Assigning ring angles...\n`);

  // Assign angles: top 3 get anchors, rest spread between
  const assigned: { username: string; ring_angle: number; github_id: number; avatar_url: string; repo_count: number; star_count: number; top_language: string | null }[] = [];

  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    let angle: number;

    if (i < 3) {
      // Top 3 → anchor positions
      angle = ANCHORS[i];
      console.log(`⭐ ANCHOR ${i + 1}: ${u.login} → angle ${angle.toFixed(4)} (${u.public_repos} repos)`);
    } else {
      // Remaining users: distribute evenly across the arc, avoiding anchor zones
      // Split the arc into segments between anchors and place users there
      const segmentIndex = (i - 3) % 4; // cycle through 4 segments
      const userInSegment = Math.floor((i - 3) / 4);
      const totalInSegment = Math.ceil((users.length - 3) / 4);

      let segStart: number, segEnd: number;
      switch (segmentIndex) {
        case 0: segStart = ARC_S + 0.05;     segEnd = ANCHORS[0] - 0.05; break; // before anchor 1
        case 1: segStart = ANCHORS[0] + 0.05; segEnd = ANCHORS[1] - 0.05; break; // between 1-2
        case 2: segStart = ANCHORS[1] + 0.05; segEnd = ANCHORS[2] - 0.05; break; // between 2-3
        case 3: segStart = ANCHORS[2] + 0.05; segEnd = ARC_E - 0.05;     break; // after anchor 3
        default: segStart = ARC_S; segEnd = ARC_E;
      }

      const t = totalInSegment > 1 ? userInSegment / (totalInSegment - 1) : 0.5;
      angle = segStart + t * (segEnd - segStart);
      console.log(`   ${u.login} → angle ${angle.toFixed(4)} (${u.public_repos} repos)`);
    }

    assigned.push({
      username: u.login,
      ring_angle: angle,
      github_id: u.github_id,
      avatar_url: u.avatar_url,
      repo_count: u.repo_count,
      star_count: u.star_count,
      top_language: u.top_language,
    });
  }

  // Upsert into Supabase
  console.log(`\n💾 Upserting ${assigned.length} users into Supabase...\n`);

  for (const u of assigned) {
    const { error } = await supabase
      .from('ring_users')
      .upsert({
        github_id: u.github_id,
        username: u.username,
        avatar_url: u.avatar_url,
        ring_angle: u.ring_angle,
        repo_count: u.repo_count,
        star_count: u.star_count,
        top_language: u.top_language,
        last_synced: new Date().toISOString(),
      }, { onConflict: 'github_id' });

    if (error) {
      console.error(`   ✗ ${u.username}: ${error.message}`);
    } else {
      console.log(`   ✓ ${u.username}`);
    }
  }

  // Verify
  const { count } = await supabase
    .from('ring_users')
    .select('*', { count: 'exact', head: true });

  console.log(`\n✅ Done! Total colonists on the ring: ${count}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
