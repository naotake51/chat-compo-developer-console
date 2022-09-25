import React, { ReactElement } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
