import React, { FC, PropsWithChildren } from 'react';

const InfoCard: FC<PropsWithChildren> = ({ children }) => {
  console.log(React.isValidElement(children) ? children.type.valueOf() : null);
  return <div>{children}</div>;
};

export default InfoCard;
