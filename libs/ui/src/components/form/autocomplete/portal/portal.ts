'use client';
import { useEffect, useState, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { IPortalProps } from './interface';

const Portal = ({
  children,
  containerId = `portal`,
  left,
  top,
}: PropsWithChildren<IPortalProps>) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(containerId);
    if (!element) {
      element = document.createElement(`div`);
      element.setAttribute(`id`, containerId);
      element.style.position = `absolute`;
      if (left !== undefined) element.style.left = `${left}px`;
      if (top !== undefined) element.style.top = `${top}px`;
      document.body.appendChild(element);
    }
    setContainer(element);

    return () => {
      if (element && element.parentNode && !element.hasChildNodes()) {
        element.parentNode.removeChild(element);
      }
    };
  }, [containerId, left, top]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return container ? createPortal(children, container) : null;
};

export default Portal;
