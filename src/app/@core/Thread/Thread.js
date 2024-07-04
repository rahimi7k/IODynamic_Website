"use strict";
// Module Worker:
/*
  if (typeof Worker !== 'undefined') {

    var worker = new Worker('./Network.worker.ts', { type: 'module' });
    worker.addEventListener('message', function (e) {
      console.log('Worker said: ', e.data);
    }, false);

    worker.postMessage('hello');
  } else {

  }
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thread = void 0;
// THIS METHOD NAME IS INLINE WORKER
var Thread = /** @class */ (function () {
    function Thread(func) {
        var WORKER_ENABLED = !!(Worker);
        if (WORKER_ENABLED) {
            var functionBody = func.toString().replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '');
            this.blob = new Blob([functionBody], { type: 'application/javascript' });
            this.url = (window.URL || window.webkitURL).createObjectURL(this.blob);
            this.worker = new Worker(this.url);
        }
        else {
            console.warn('WebWorker is not enabled');
        }
    }
    Thread.prototype.run = function (data) {
        this.worker.postMessage(data);
    };
    Thread.prototype.onResult = function (resultHandler) {
        this.worker.onmessage = function (messageEvent) {
            resultHandler(messageEvent.data);
        };
        this.worker.onerror = function (data) {
            resultHandler(data);
        };
    };
    Thread.prototype.close = function () {
        if (this.worker) {
            this.worker.terminate();
        }
        this.worker = null;
        URL.revokeObjectURL(this.url);
        this.url = null;
        this.blob = null;
    };
    return Thread;
}());
exports.Thread = Thread;
//# sourceMappingURL=Thread.js.map