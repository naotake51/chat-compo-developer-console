import React, { ReactElement } from 'react';
import Header from '../organisms/Header/Header';

type HasChildren = Required<{
  readonly children: ReactElement;
}>;

export default function Template({ children }: HasChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
