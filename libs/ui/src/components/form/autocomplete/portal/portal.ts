'use client';
import { useEffect, useState, FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { IPortalProps } from './interface';

const Portal: FC<PropsWithChildren<IPortalProps>> = ({
  children,
  containerId = `portal`,
  left,
  top,
}) => {
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

  return container ? createPortal(children, container) : null;
};

export default Portal;
