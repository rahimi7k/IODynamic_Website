
/*You can have no access to the window Object from a worker
 * In worker do not write -> window.indexedDB.open()
 * Write -> indexedDB.open()
 * 
*/


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


// THIS METHOD NAME IS INLINE WORKER
export class Thread {

	private worker: Worker;
	private url: string;
	private blob: Blob;

	constructor(func) {

		const WORKER_ENABLED = !!(Worker);

		if (WORKER_ENABLED) {

			const functionBody = func.toString().replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '');
			this.blob = new Blob([functionBody], { type: 'application/javascript' });
			this.url = (window.URL || window.webkitURL).createObjectURL(this.blob);
			this.worker = new Worker(this.url, { type: "classic" }/*, { type: "module" }*/); //TODO Learn

		} else {
			console.warn('WebWorker is not enabled');
		}
	}

	public run(data): void {
		this.worker.postMessage(data);
	}

	public onResult(resultHandler: (messageEvent: any) => void): void {
		this.worker.onmessage = (messageEvent) => {
			resultHandler(messageEvent.data);
		};

		this.worker.onerror = (data) => {
			resultHandler(data);
		};
	}

	public close(): void {
		if (this.worker) {
			this.worker.terminate();
		}
		this.worker = null;
		URL.revokeObjectURL(this.url);
		this.url = null;
		this.blob = null;

	}

}
