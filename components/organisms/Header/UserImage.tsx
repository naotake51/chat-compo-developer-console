/* eslint-disable react/forbid-component-props */
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';
import React from 'react';

UserImage.propTypes = {
  src: PropTypes.string.isRequired,
};

UserImage.defaultProps = {};

export default function UserImage({ src }: InferProps<typeof UserImage.propTypes>) {
  const size = 40;

  return (
    <Image
      alt='user'
      className='overflow-hidden rounded-full'
      height={size}
      objectFit='cover'
      src={src}
      width={size}
    />
  );
}
