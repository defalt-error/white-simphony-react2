import fs from 'fs';
import path from 'path';
import * as git from 'isomorphic-git';
import http from 'isomorphic-git/http/node.js';
import ignore from 'ignore';

const dir = process.cwd();
const repo = process.env.GITHUB_REPO || 'defalt-error/white-simphony-react2';
const branch = process.env.GIT_BRANCH || 'main';
const token = process.env.GITHUB_TOKEN;
const authorName = process.env.GIT_AUTHOR_NAME || 'White Symphony Uploader';
const authorEmail = process.env.GIT_AUTHOR_EMAIL || 'no-reply@example.com';
const commitMessage = process.env.GIT_COMMIT_MESSAGE || 'Subir trabajo inicial';

if (!token) {
  console.error('ERROR: Falta la variable de entorno GITHUB_TOKEN con permisos repo.');
  process.exit(1);
}

function loadIgnore(dir) {
  const ig = ignore();
  try {
    const gi = fs.readFileSync(path.join(dir, '.gitignore'), 'utf8');
    ig.add(gi);
  } catch {}
  // Patrones seguros adicionales
  ig.add([
    '.git/',
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    '.cache/',
    '.parcel-cache/',
    '.turbo/',
    '.vscode/',
    '.idea/',
    '*.log',
    '*.local',
    '.DS_Store',
    'Thumbs.db',
  ]);
  return ig;
}

async function listFiles(root, ig) {
  const results = [];
  const stack = ['.'];
  while (stack.length) {
    const rel = stack.pop();
    const abs = path.join(root, rel);
    const entries = fs.readdirSync(abs, { withFileTypes: true });
    for (const ent of entries) {
      const relPath = path.posix.join(rel.replace(/\\/g, '/'), ent.name);
      // ignore check (paths must be posix-style)
      if (ig.ignores(relPath)) continue;
      if (ent.isDirectory()) {
        stack.push(relPath);
      } else {
        results.push(relPath);
      }
    }
  }
  return results;
}

async function ensureRepoInitialized() {
  const gitDir = path.join(dir, '.git');
  if (!fs.existsSync(gitDir)) {
    await git.init({ fs, dir });
    console.log('Repo inicializado (.git creado).');
  } else {
    console.log('Repo ya inicializado.');
  }
}

async function addAll(files) {
  for (const filepath of files) {
    await git.add({ fs, dir, filepath });
  }
}

async function makeCommit() {
  const oid = await git.commit({
    fs,
    dir,
    message: commitMessage,
    author: { name: authorName, email: authorEmail },
    committer: { name: authorName, email: authorEmail },
  });
  console.log('Commit creado:', oid);
}

async function tryPush(refName) {
  const url = `https://github.com/${repo}.git`;
  console.log(`Empujando a ${url} rama ${refName}...`);
  await git.push({
    fs,
    http,
    dir,
    url,
    ref: refName,
    onAuth: () => ({ username: token, password: 'x-oauth-basic' }),
  });
  console.log(`Push completado en rama ${refName}.`);
}

async function main() {
  console.log('Directorio:', dir);
  const ig = loadIgnore(dir);
  await ensureRepoInitialized();
  const files = await listFiles(dir, ig);
  if (files.length === 0) {
    console.error('No hay archivos para commitear después de aplicar .gitignore.');
    process.exit(1);
  }
  console.log(`Archivos a añadir: ${files.length}`);
  await addAll(files);
  await makeCommit();
  try {
    await tryPush(branch);
  } catch (err) {
    console.warn('Push a main falló, intentando rama alternativa. Detalle:', err.message || err);
    const alt = process.env.GIT_FALLBACK_BRANCH || 'upload-ws';
    await tryPush(alt);
  }
}

main().catch((e) => {
  console.error('ERROR general:', e);
  process.exit(1);
});