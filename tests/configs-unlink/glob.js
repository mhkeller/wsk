var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('unlink', 'glob', 'file.test');
// Write the file we are going to be deleting
io.writeDataSync(filePath, 'test', {makeDirs: true});
var glob = tmpPath('unlink', 'glob', '*.test');

var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: glob,
      events: [
        {
          type: 'unlink',
          taskFiles: taskFilePath
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{ 'tests/tmp/unlink/glob': [ 'file.test' ] }]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/unlink/glob/*.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/unlink/glob/file.test\u001b[22m'],
    onEvent: ['\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[36mFile removal detected...\u001b[39m \u001b[1mtests/tmp/unlink/glob/file.test\u001b[22m'],
    onTaskFileEvent: [{
      eventType: 'unlink',
      filePath: filePath,
      taskFilePath: taskFilePath,
      options: undefined
    }]
  }
};
