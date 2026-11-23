// Regenerates the sample audio of civics.html with an ElevenLabs voice.
//
// Needs Node 18 or newer. Works in Windows PowerShell, macOS and Linux. No npm install.
//
//   PowerShell:   $env:ELEVENLABS_API_KEY = "your-key"; node elevenlabs.mjs
//   macOS/Linux:  ELEVENLABS_API_KEY=your-key node elevenlabs.mjs
//
// Options (environment variables):
//   ELEVENLABS_VOICE_ID  voice to use (default: Sarah, a US English voice). List yours with:  node elevenlabs.mjs --voices
//   ELEVENLABS_MODEL     default eleven_multilingual_v2
//   ELEVENLABS_FORMAT    default mp3_44100_96
// Flags:
//   --only q01-q,q01-a   regenerate only these clips
//   --voices             list the voices on your account and stop
//
// Output: when run from the root of the site repo it overwrites assets/audio/civics/<id>.mp3;
// anywhere else it writes the files to ./civics-audio/. The clip texts come from clips.json next to
// this script, or from https://novanest-atlas.net/tools/civics-audio/clips.json if it is not there.
// The key is read from the environment only and is never printed or saved.

import { readFile, writeFile, mkdir, rename, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KEY = process.env.ELEVENLABS_API_KEY;
const VOICE = process.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL';
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
const FORMAT = process.env.ELEVENLABS_FORMAT || 'mp3_44100_96';
const API = 'https://api.elevenlabs.io/v1';

if (!KEY) {
  console.error('Set ELEVENLABS_API_KEY first. PowerShell:  $env:ELEVENLABS_API_KEY = "your-key"');
  process.exit(1);
}
const args = process.argv.slice(2);

if (args.includes('--voices')) {
  const r = await fetch(`${API}/voices`, { headers: { 'xi-api-key': KEY } });
  if (!r.ok) { console.error('ElevenLabs error', r.status, await r.text()); process.exit(1); }
  const { voices } = await r.json();
  for (const v of voices) console.log(v.voice_id.padEnd(24), v.name, v.labels ? JSON.stringify(v.labels) : '');
  process.exit(0);
}

const here = dirname(fileURLToPath(import.meta.url));
let manifest;
const local = join(here, 'clips.json');
if (existsSync(local)) manifest = JSON.parse(await readFile(local, 'utf8'));
else {
  const r = await fetch('https://novanest-atlas.net/tools/civics-audio/clips.json');
  if (!r.ok) { console.error('Could not download clips.json:', r.status); process.exit(1); }
  manifest = await r.json();
}

const onlyArg = args.indexOf('--only');
const only = onlyArg >= 0 ? new Set((args[onlyArg + 1] || '').split(',').filter(Boolean)) : null;
const outDir = existsSync(join(process.cwd(), 'assets', 'audio', 'civics')) ? join(process.cwd(), 'assets', 'audio', 'civics') : join(process.cwd(), 'civics-audio');
await mkdir(outDir, { recursive: true });

const clips = manifest.clips.filter(c => !only || only.has(c.id));
console.log(`Voice ${VOICE}, model ${MODEL}, ${clips.length} clips -> ${outDir}`);
let failed = 0;
for (const c of clips) {
  const isExplanation = c.id.endsWith('-x');
  const body = {
    text: c.text,
    model_id: MODEL,
    // Questions and answers slightly slower and steadier, like an officer reading clearly.
    voice_settings: { stability: 0.6, similarity_boost: 0.8, style: 0, use_speaker_boost: true, speed: isExplanation ? 1.0 : 0.92 },
  };
  let ok = false;
  for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
    const r = await fetch(`${API}/text-to-speech/${VOICE}?output_format=${FORMAT}`, {
      method: 'POST',
      headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
      body: JSON.stringify(body),
    });
    if (r.ok) {
      const buf = Buffer.from(await r.arrayBuffer());
      const tmp = join(outDir, c.id + '.part');
      await writeFile(tmp, buf);
      await rename(tmp, join(outDir, c.id + '.mp3'));
      const { size } = await stat(join(outDir, c.id + '.mp3'));
      console.log('ok  ', c.id.padEnd(6), (size / 1024).toFixed(0) + ' KB', ' ', c.text);
      ok = true;
    } else {
      const msg = (await r.text()).slice(0, 300);
      if (r.status === 429 || r.status >= 500) { await new Promise(res => setTimeout(res, 2000 * attempt)); continue; }
      console.error('FAIL', c.id, r.status, msg);
      break;
    }
  }
  if (!ok) failed++;
}
console.log(failed ? `${failed} clip(s) failed.` : 'All clips done. Listen to a few, then publish the assets/audio/civics folder.');
process.exit(failed ? 1 : 0);
