const child = require('child_process');
const fs = require('fs');

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

currentVersion[1] = +currentVersion[1] + 1;
const newVersion = `${currentVersion[0]}.${currentVersion[1]}.${currentVersion[2]}`;
let newChangelog = `## [${newVersion}] - ${
  new Date().toISOString().split('T')[0]
}\n`;

const added = [];
const fixed = [];
const changed = [];


commitsArray.forEach((commit) => {
  if (commit.message.startsWith('[ADDED]')) {
    added.push(
      `- ${commit.message.replace('[ADDED]', '')} ([${commit.sha.substring(
        0,
        6,
      )}](https://github.com/sikaili/skyl.fr/commit/${
        commit.sha
      }))\n`,
    );
  }
  if (commit.message.startsWith('[FIXED]')) {
    fixed.push(
      `- ${commit.message.replace('[FIXED]', '')} ([${commit.sha.substring(
        0,
        6,
      )}](https://github.com/sikaili/skyl.fr//commit/${
        commit.sha
      }))\n`,
    );
  }
  if (commit.message.startsWith('[CHANGED]')) {
    changed.push(
      `- ${commit.message.replace('[CHANGED]', '')} ([${commit.sha.substring(
        0,
        6,
      )}](https://github.com/sikaili/skyl.fr//commit/${
        commit.sha
      }))\n`,
    );
  }
});

if (added.length) {
  newChangelog += '### Added\n';
  added.forEach((added) => {
    newChangelog += added;
  });
  newChangelog += '\n';
}

if (fixed.length) {
  newChangelog += '### Fixed\n';
  fixed.forEach((fixed) => {
    newChangelog += fixed;
  });
  newChangelog += '\n';
}

if (changed.length) {
  newChangelog += '### Changed\n';
  changed.forEach((changed) => {
    newChangelog += changed;
  });
  newChangelog += '\n';
}

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
