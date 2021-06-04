const util = require('util');
const fs = require('fs-extra');
const path = require('path');
const exec = util.promisify(require('child_process').exec);

async function build() {
    const currentDir = __dirname;
    const microbitMainFolderName = 'microbit-main';
    const microbitTerryFoxRunFolderName = 'microbit-terryfox-run';
    const microbitTemperatureCollectorFolderName = 'microbit-temperature-collector';
    console.log("Building microbit-main.");
    process.chdir(path.join(currentDir, microbitMainFolderName));
    await exec('npm run winBuild');

    console.log("Building microbit-terryfox-run.")
    process.chdir(path.join(currentDir, microbitTerryFoxRunFolderName))
    await exec('npm run winBuild');

    // console.log("Building microbit-temperature-collector.")
    // process.chdir("../microbit-temperature-collector")
    // await exec('npm run winBuild');

    process.chdir(currentDir);
    const outputFolder = path.join(currentDir, 'microbit-build');
    if (!fs.existsSync(outputFolder)){
      fs.mkdirSync(outputFolder);
    }

    const microbitMainOutputFolder = path.join(outputFolder, microbitMainFolderName);
    if (!fs.existsSync(microbitMainOutputFolder)){
      fs.mkdirSync(microbitMainOutputFolder);
    }

    const microbitTerryFoxRunOutputFolder = path.join(outputFolder,microbitTerryFoxRunFolderName);
    if (!fs.existsSync(microbitTerryFoxRunOutputFolder)){
      fs.mkdirSync(microbitTerryFoxRunOutputFolder);
    }

    const microbitTemperatureCollectorOutputFolder = path.join(outputFolder, microbitTemperatureCollectorFolderName);
    if (!fs.existsSync(microbitTemperatureCollectorOutputFolder)){
      fs.mkdirSync(microbitTemperatureCollectorOutputFolder);
    }

    console.log("Copying build files to " + outputFolder);

    copyFiles(path.join(currentDir, microbitMainFolderName, "build"), microbitMainOutputFolder);
    copyFiles(path.join(currentDir, microbitTerryFoxRunFolderName, "build"), microbitTerryFoxRunOutputFolder);
    copyFiles(path.join(currentDir, microbitTemperatureCollectorFolderName, "legacy-code"), microbitTemperatureCollectorOutputFolder);
    // copy _redirect
    copyFiles(path.join(currentDir, '_redirects'), path.join(outputFolder, '_redirects'));
}

function copyFiles(src, des){
  fs.copySync(src, des, { overwrite: true });
}
build();
