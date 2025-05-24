#!/usr/bin/env node
import { runDocgen } from '../src/index.js';
import { program } from 'commander';

import dotenv from 'dotenv';
dotenv.config();

program
  .version('1.0.0')
  .description('Generate component documentation')
  .option('-i, --input <path>', 'Input folder', './src')
  .option('-o, --output <path>', 'Output folder', './ui/public/data')
  .parse();

const options = program.opts();
runDocgen(options);
