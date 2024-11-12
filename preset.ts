function config(entry = []) {
  return [...entry, require.resolve("./dist/preview/preview.js")];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve("./dist/manager/manager.js")];
}

module.exports = {
  managerEntries,
  config,
};
