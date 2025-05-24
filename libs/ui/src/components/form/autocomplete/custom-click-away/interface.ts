import { ReactElement } from 'react';

export type ClickAwayMouseEventHandler =
  | `onClick`
  | `onMouseDown`
  | `onMouseUp`
  | `onPointerDown`
  | `onPointerUp`;

export type ClickAwayTouchEventHandler = `onTouchStart` | `onTouchEnd`;

export interface IClickAwayListenerProps {
  /**
   * The wrapped element.
   */
  children: ReactElement;
  /**
   * If `true`, the React tree is ignored and only the DOM tree is considered.
   * This prop changes how portal elements are handled.
   * @default false
   */
  disableReactTree?: boolean;
  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   * @default 'onClick'
   */
  mouseEvent?: ClickAwayMouseEventHandler | false;
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: (event: MouseEvent | TouchEvent) => void;
  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   * @default 'onTouchEnd'
   */
  touchEvent?: ClickAwayTouchEventHandler | false;
}
