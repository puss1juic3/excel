import {$} from '@core/DOM';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');

  const coords = $parent.getCoords($parent);
  const type = $resizer.data.resize;

  const sideProp = type === 'col' ? 'bottom' : 'right';

  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);

  $resizer.css({
    'opacity': 1,
    [sideProp]: '-5000px',
  });

  let delta = 0;

  document.onmousemove = (e) => {
    if (type === 'col') {
      delta = e.pageX - coords.right;
      $parent.css({
        width: (coords.width+delta)+'px',
      });
    } else if (type === 'row') {
      const delta = e.pageY - coords.bottom;
      $resizer.css({
        bottom: 0,
      });
      $parent.css({height: (coords.height+delta) + 'px'});
    }
  };

  document.onmouseup = (e) => {
    if (type === 'col') {
      // eslint-disable-next-line max-len
      cells.forEach((cell) => cell.style.width = (coords.width+delta) + 'px');
    }
    $resizer.css({opacity: 0, bottom: 0, right: 0});
    document.onmousemove = null;
    document.onmouseup = null;
  };
}
