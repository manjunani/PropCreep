#!/usr/bin/env node
import { runDocgen } from '../src/index.js';
import { program } from 'commander';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import open from 'open';
import fs from 'fs-extra';
import path from 'path';
const viewerPath = path.resolve('viewer');

// Load from .env (if present)
dotenv.config();

// Configure CLI
program
  .version('1.0.0')
  .description('Generate component documentation')
  .option('-i, --input <path>', 'Input folder', './src')
  .option('-o, --output <path>', 'Output folder', './ui/public/data')
  .option('--ai <provider>', 'AI mode to use (static | openai | gemini)')
  .option('--openai-key <key>', 'OpenAI API key (optional)')
  .option('--gemini-key <key>', 'Gemini API key (optional)')
  .option('-v, --view', 'Launch viewer UI')
  .parse();

const options = program.opts();

// 🔐 Set environment variables from CLI (override .env)
if (options.ai) process.env.PROP_AI_MODE = options.ai;
if (options.openaiKey) process.env.OPENAI_API_KEY = options.openaiKey;
if (options.geminiKey) process.env.GEMINI_API_KEY = options.geminiKey;

// 🧠 Run your docgen logic
await runDocgen(options);

const userProjectReportPath = path.resolve('./propcreep-report');
const generatedDataPath = path.resolve(options.output); // e.g., ./docs
const builtViewerPath = path.resolve('./viewer'); // from your package

// Step 1: Clean + Create final output path
await fs.remove(userProjectReportPath);
await fs.ensureDir(userProjectReportPath);

// Step 2: Copy built viewer UI
await fs.copy(builtViewerPath, userProjectReportPath);

// Step 3: Copy JSON data into viewer/data
await fs.ensureDir(path.join(userProjectReportPath, 'data'));
await fs.copy(generatedDataPath, path.join(userProjectReportPath, 'data'));

// 🌐 Serve Viewer if requested
if (options.view) {
  console.log('🚀 Launching viewer at http://localhost:5173');
  exec('npx serve ./propcreep-report -l 5173 -s');
  open('http://localhost:5173');
}
