import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubs = [];

    this.prepare();
  }

  // Before init
  prepare() {}

  toHTML() {
    return '';
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubs.push(unsub);
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubs.forEach((unsub) => unsub());
  }
}
