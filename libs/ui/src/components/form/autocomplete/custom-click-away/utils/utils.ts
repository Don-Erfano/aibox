import {
  ClickAwayMouseEventHandler,
  ClickAwayTouchEventHandler,
} from '../interface';

export function mapEventPropToEvent(
  eventProp: ClickAwayMouseEventHandler | ClickAwayTouchEventHandler
):
  | `click`
  | `mousedown`
  | `mouseup`
  | `touchstart`
  | `touchend`
  | `pointerdown`
  | `pointerup` {
  return eventProp.substring(2).toLowerCase() as any;
}

export function clickedRootScrollbar(event: MouseEvent, doc: Document) {
  return (
    doc.documentElement.clientWidth < event.clientX ||
    doc.documentElement.clientHeight < event.clientY
  );
}
