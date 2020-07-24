const child = require('child_process');
const fs = require('fs');
// <version core> ::= <major> "." <minor> "." <patch>
// 0, 1, 2
const versionCore = 2;

const latestTag = child.execSync('git describe --long').toString('utf-8').split('-')[0];

const output = child
  .execSync(`git log ${latestTag}..HEAD --format=%B%H----DELIMITER----`)
  .toString('utf-8');

const commitsArray = output
  .split('----DELIMITER----\n')
  .map((commit) => {
    const [message, sha] = commit.split('\n');

    return { sha, message };
  })
  .filter((commit) => Boolean(commit.sha));

const currentChangelog = fs.readFileSync('./CHANGELOG.md', 'utf-8');
const currentVersion = require('./package.json').version.split('.');

currentVersion[versionCore] = +currentVersion[versionCore] + 1;
for (let i = versionCore + 1; i < 3; i += 1) {
  currentVersion[i] = 0;
}
const newVersion = currentVersion.join('.');
let newChangelog = `## [${newVersion}] - ${
  new Date().toISOString().split('T')[0]
}\n`;

const added = [];
const fixed = [];
const changed = [];

commitsArray.forEach((commit) => {
  if (commit.message.startsWith('added:')) {
    added.push(
      `- ${commit.message.replace('added:', '')} ([${commit.sha.substring(
        0,
        6,
      )}](https://github.com/sikaili/skyl.fr/commit/${
        commit.sha.slice(0, 6)
      }))\n`,
    );
  }
  if (commit.message.startsWith('fixed:')) {
    fixed.push(
      `- ${commit.message.replace('fixed:', '')} ([${commit.sha.substring(
        0,
        6,
      )}](https://github.com/sikaili/skyl.fr/commit/${
        commit.sha.slice(0, 6)
      }))\n`,
    );
  }
  if (commit.message.startsWith('changed:')) {
    changed.push(
      `- ${commit.message.replace('changed:', '')} ([${commit.sha.substring(
        0,
        6,
      )}](https://github.com/sikaili/skyl.fr/commit/${
        commit.sha.slice(0, 6)
      }))\n`,
    );
  }
});

if (added.length) {
  newChangelog += '### Added\n';
  added.forEach((added) => {
    newChangelog += added;
  });
}

if (fixed.length) {
  newChangelog += '### Fixed\n';
  fixed.forEach((fixed) => {
    newChangelog += fixed;
  });
}

if (changed.length) {
  newChangelog += '### Changed\n';
  changed.forEach((changed) => {
    newChangelog += changed;
  });
}
newChangelog += '\n';

if (!fixed.length && !changed.length && !added.length) {
  newChangelog = '';
}
if (newChangelog) {
// prepend the newChangelog to the current one
  fs.writeFileSync('./CHANGELOG.md', `${newChangelog}${currentChangelog}`);
  const packageData = require('./package.json');

  packageData.version = newVersion;
  fs.writeFileSync('./package.json', JSON.stringify(packageData, null, '\t'));

  // create a new commit
  child.execSync('git add .');
  child.execSync(`git commit -m "chore: Bump to version ${newVersion}"`);

  // tag the commit
  child.execSync(`git tag -a -m "Tag for version ${newVersion}" ${newVersion}`);
}
