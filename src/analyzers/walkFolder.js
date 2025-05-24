import { globby } from 'globby';

/**
 * Recursively walks a directory and returns all JS/TS component files.
 *
 * @param {string} baseDir - Root directory to search from
 * @returns {Promise<string[]>} List of matched file paths
 */
export async function walkFolder(baseDir) {
  return await globby([`${baseDir}/**/*.{js,jsx,ts,tsx}`]);
}
