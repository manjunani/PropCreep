#!/usr/bin/env node

import { runDocgen } from '../src/index.js';
import { program } from 'commander';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import open from 'open';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env if present
dotenv.config();

// Define CLI flags
program
  .version('1.0.7')
  .description('Generate component documentation')
  .option('-i, --input <path>', 'Input folder', './src')
  .option('-o, --output <path>', 'Output folder', './ui/public/data')
  .option('--ai <provider>', 'AI mode to use (static | openai | gemini)')
  .option('--openai-key <key>', 'OpenAI API key (optional)')
  .option('--gemini-key <key>', 'Gemini API key (optional)')
  .option('-v, --view', 'Launch viewer UI')
  .parse();

const options = program.opts();

// 🔐 Apply CLI overrides for environment variables
if (options.ai) process.env.PROP_AI_MODE = options.ai;
if (options.openaiKey) process.env.OPENAI_API_KEY = options.openaiKey;
if (options.geminiKey) process.env.GEMINI_API_KEY = options.geminiKey;

// 🧠 Run doc generation
await runDocgen(options);

// 📁 Path Setup
const userProjectReportPath = path.resolve('./propcreep-report');
const generatedDataPath = path.resolve(options.output);
const builtViewerPath = path.resolve(__dirname, '../viewer'); // ⬅️ This is the fix!

// 🔄 Clean + rebuild report output
await fs.remove(userProjectReportPath);
await fs.ensureDir(userProjectReportPath);

// 🧱 Copy UI files into report
if (!fs.existsSync(path.join(builtViewerPath, 'index.html'))) {
  console.error(
    '❌ Built viewer UI not found. Did you run `npm run build` in /ui and copy to /viewer?'
  );
  process.exit(1);
}
await fs.copy(builtViewerPath, userProjectReportPath);

// 📦 Copy JSON data into report/data
await fs.ensureDir(path.join(userProjectReportPath, 'data'));
await fs.copy(generatedDataPath, path.join(userProjectReportPath, 'data'));

console.log('✅ PropCreep report generated at ./propcreep-report');

// 🌐 Launch viewer if requested
if (options.view) {
  console.log('🚀 Launching viewer at http://localhost:5173...');
  exec('npx serve ./propcreep-report -l 5173 -s');
  open('http://localhost:5173');
}
