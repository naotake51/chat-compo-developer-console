import React from 'react';
import { BsChatLeft } from 'react-icons/bs';

export default function Logo() {
  return (
    <div className='flex p-2'>
      <BsChatLeft size={32} />
      <p className='ml-2 text-xl'>Chat Compo</p>
    </div>
  );
}
