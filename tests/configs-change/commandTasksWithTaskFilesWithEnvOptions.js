var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var tmpFile = tmpPath('change', 'commandTasksWithTaskFilesWithEnvOptions', 'file.test');
io.writeDataSync(tmpFile, 'file', {makeDirs: true});

var commandPath = testPath('clis', 'report.js');
var commandPath2 = testPath('clis', 'report-2.js');

var taskFilePath = testPath('taskFiles', 'report.js');
var taskFilePath2 = testPath('taskFiles', 'report-2.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: tmpFile,
      events: [
        {
          type: 'change',
          commands: [
            'node ' + commandPath,
            'node ' + commandPath2
          ],
          taskFiles: [
            taskFilePath,
            taskFilePath2
          ],
          env: {
            report: true
          },
          options: {
            report: true
          }
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{ 'tests/tmp/change/commandTasksWithTaskFilesWithEnvOptions': [ 'file.test' ] }]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/change/commandTasksWithTaskFilesWithEnvOptions/file.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/change/commandTasksWithTaskFilesWithEnvOptions/file.test\u001b[22m'],
    onEvent: ['\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[36mFile changed...\u001b[39m \u001b[1mtests/tmp/change/commandTasksWithTaskFilesWithEnvOptions/file.test\u001b[22m'],
    onCommandEvent: [{
      code: 100,
      command: commandPath,
      env: {
        report: true
      }
    }, {
      code: 100,
      command: commandPath2,
      env: {
        report: true
      }
    }],
    onTaskFileEvent: [{
      eventType: 'change',
      filePath: tmpFile,
      taskFilePath: taskFilePath,
      options: {
        report: true
      }
    }, {
      eventType: 'change',
      filePath: tmpFile,
      taskFilePath: taskFilePath2,
      options: {
        report: true
      }
    }]
  }
};
