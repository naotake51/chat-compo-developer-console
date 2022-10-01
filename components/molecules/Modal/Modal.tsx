/* eslint-disable react/jsx-max-depth */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable react/forbid-component-props */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-handler-names */

import { Dialog, Transition } from '@headlessui/react';
import PropTypes, { InferProps } from 'prop-types';
import React, { Fragment, ReactElement } from 'react';

Modal.propTypes = {
  description: PropTypes.string,
  modal: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
  }).isRequired,
  title: PropTypes.string,
};

Modal.defaultProps = {
  description: undefined,
  title: undefined,
};

type HasChildren = Required<{
  readonly children: ReactElement;
}>;

export default function Modal({
  description,
  modal,
  title,
  children,
}: InferProps<typeof Modal.propTypes> & HasChildren) {
  return (
    <Transition appear as={Fragment} show={modal.isOpen}>
      <Dialog as='div' className='relative z-10' onClose={modal.close} open={modal.isOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                {title ? (
                  <Dialog.Title
                    as='h3'
                    className='mb-4 text-lg font-medium leading-6 text-gray-900'
                  >
                    {title}
                  </Dialog.Title>
                ) : null}
                {description ? <Dialog.Description>{description}</Dialog.Description> : null}

                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
