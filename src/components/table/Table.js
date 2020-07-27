import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, shouldResize, matrix, nextSelector} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/DOM';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $selectedCells = matrix($target, this.selection.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`)); // replace string id with $cell
        this.selection.selectGroup($selectedCells);
      } else {
        this.selection.select($(event.target));
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];

    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      const currentId = this.selection.current.getId(true);
      console.log(event.key);
      const $next = this.$root.find(nextSelector(event.key, currentId));

      this.selection.select($next);
    }
  }
}


