import {
  Cursor,
  Cursors,
  Guides,
  HitTests,
  Items,
  Pivots,
  Selections,
} from 'app/scripts/paper/util';
import * as paper from 'paper';

import { Gesture } from './Gesture';

/**
 * A gesture that performs hover operations.
 *
 * This gesture is used as the default gesture during selection mode.
 * It listens for mouse move events and reacts by drawing overlays
 * on top of items and changing the cursor style accordingly.
 */
export class HoverItemsGesture extends Gesture {
  // @Override
  onMouseMove({ point }: paper.ToolEvent) {
    Cursors.clear();

    const hitResult = HitTests.selectionMode(point, ({ item }: paper.HitResult) => {
      return Items.isPath(item) && !item.selected;
    });
    if (hitResult) {
      Guides.showHoverPath(hitResult.item as paper.Path);
    } else {
      Guides.hideHoverPath();
    }

    const selectionBounds = Guides.getSelectionBoundsPath();
    if (selectionBounds) {
      const res = HitTests.selectionBoundsPivot(selectionBounds, point);
      if (res) {
        Cursors.set(Pivots.getResizeCursor(res.segment.index));
      }
    }
  }
}