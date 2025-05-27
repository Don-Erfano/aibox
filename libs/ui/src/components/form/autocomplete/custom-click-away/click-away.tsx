'use client';
import {
  cloneElement,
  DOMAttributes,
  FC,
  Ref,
  SyntheticEvent,
  useEffect,
  useRef,
} from 'react';
import {
  ClickAwayMouseEventHandler,
  ClickAwayTouchEventHandler,
  IClickAwayListenerProps,
} from './interface';
import ownerDocument from './owner-document';
import { clickedRootScrollbar, mapEventPropToEvent } from './utils/utils';
import useEventCallback from '../hooks/useEventCallback';
import useForkRef from '../hooks/useForkRef';

/**
 * `ClickAwayListener` is a React component that listens for click events of its child component and triggers a callback.
 * This is useful for closing modal dialogs, dropdowns, and other floating elements when a user interacts with the rest of the application.
 *
 * @example
 * <ClickAwayListener onClickAway={handleClickAway}>
 *   <div>Child Component</div>
 * </ClickAwayListener>
 * @returns {JSX.Element} A component that wraps a child and listens for click events outside of it.
 */

const ClickAwayListener: FC<IClickAwayListenerProps> = (props) => {
  const {
    children,
    disableReactTree = false,
    mouseEvent = `onClick`,
    onClickAway,
    touchEvent = `onTouchEnd`,
  } = props;
  const movedRef = useRef(false);
  const nodeRef = useRef<Element>(null);
  const activatedRef = useRef(false);
  const syntheticEventRef = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      activatedRef.current = true;
    }, 0);
    return () => {
      activatedRef.current = false;
    };
  }, []);

  const handleRef = useForkRef(
    // @ts-expect-error
    children.ref,
    nodeRef
  );
  const handleClickAway = useEventCallback((event: MouseEvent | TouchEvent) => {
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;

    const doc = ownerDocument(nodeRef.current);

    if (
      !activatedRef.current ||
      !nodeRef.current ||
      (`clientX` in event && clickedRootScrollbar(event, doc))
    ) {
      return;
    }

    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    let insideDOM;

    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM =
        !doc.documentElement.contains(event.target as Node) ||
        nodeRef.current.contains(
          // @ts-expect-error returns `false` as intended when not dispatched from a Node
          event.target
        );
    }

    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event);
    }
  });

  // Keep track of mouse/touch events that bubbled up through the portal.
  const createHandleSynthetic =
    (handlerName: string) => (event: SyntheticEvent) => {
      syntheticEventRef.current = true;

      const childrenPropsHandler = children.props[handlerName];
      if (childrenPropsHandler) {
        childrenPropsHandler(event);
      }
    };

  const childrenProps: { ref: Ref<Element> } & Pick<
    DOMAttributes<Element>,
    ClickAwayMouseEventHandler | ClickAwayTouchEventHandler
  > = { ref: handleRef };

  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }

  useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      const doc = ownerDocument(nodeRef.current);

      const handleTouchMove = () => {
        movedRef.current = true;
      };

      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener(`touchmove`, handleTouchMove);

      return () => {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener(`touchmove`, handleTouchMove);
      };
    }

    return undefined;
  }, [handleClickAway, touchEvent]);

  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }

  useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      const doc = ownerDocument(nodeRef.current);

      doc.addEventListener(mappedMouseEvent, handleClickAway);

      return () => {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }

    return undefined;
  }, [handleClickAway, mouseEvent]);

  return <>{cloneElement(children, childrenProps)}</>;
};

export default ClickAwayListener;
