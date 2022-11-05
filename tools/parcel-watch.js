/**
 * This tool is needed until parcel does not detect changes in linked
 * dependencies.
 *
 * Please see: https://github.com/parcel-bundler/parcel/issues/4332
 */

const fs = require('fs');
const chokidar = require('chokidar');

const refreshWebApplication = () => {
  const now = new Date();
  fs.utimes('./ui/web/package.json', now, now, () => {});
};

chokidar.watch('./shared/lib/dist/main.js').on('all', (event, path) => {
  console.log('Library changed, refreshing...');
  refreshWebApplication();
});
