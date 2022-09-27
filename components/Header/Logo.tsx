import React from 'react';
import { BsChatLeft } from 'react-icons/bs';

export default function Logo() {
  return (
    <div className='flex items-center p-2'>
      <BsChatLeft color='rgb(248 250 252)' size={32} />
      <p className='ml-2 text-2xl text-slate-50'>Chat Compo</p>
    </div>
  );
}
