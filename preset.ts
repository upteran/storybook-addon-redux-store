function config(entry = []) {
  return [...entry, require.resolve("./preview.js")];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve("./manager.js")];
}

module.exports = {
  managerEntries,
  config,
};
