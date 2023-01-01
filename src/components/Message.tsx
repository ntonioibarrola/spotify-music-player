import { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useMessageStore } from '../contexts/message-contexts';
import Image from 'next/image';

const Message: FC = () => {
  const { message, isMessageOpen, setIsMessageOpen } = useMessageStore();

  return (
    <Fragment>
      <Transition appear show={isMessageOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => setIsMessageOpen(false)}>
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
                <Dialog.Panel
                  className='flex w-full max-w-md transform flex-col items-center gap-y-2 overflow-hidden
                  rounded-2xl bg-white p-8 px-12 text-center align-middle shadow-xl transition-all sm:p-16'
                >
                  <Image
                    className={`h-[50px] w-[50px]`}
                    src={
                      message?.type === 'error'
                        ? '/error.svg'
                        : message?.type === 'warning'
                        ? '/warning.svg'
                        : '/info.svg'
                    }
                    width='50'
                    height='50'
                    alt='Message Icon'
                  />
                  <Dialog.Title
                    as='h3'
                    className={`${
                      message?.type === 'error'
                        ? 'text-error'
                        : message?.type === 'warning'
                        ? 'text-warning'
                        : 'text-info'
                    } font-poppins text-xl font-bold leading-6 text-error`}
                  >
                    {message?.title}
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500 sm:text-[0.95rem]'>
                      {message?.description}
                    </p>
                  </div>
                  {message?.url && (
                    <div className='mt-2'>
                      <a
                        className='text-sm text-info hover:underline focus:outline-none sm:text-[0.95rem]'
                        href={message.url}
                        target='_blank'
                      >
                        {message.url}
                      </a>
                    </div>
                  )}
                  <div className='mt-4'>
                    <button
                      type='button'
                      className={`${
                        message?.type === 'error'
                          ? 'bg-error focus-visible:ring-error'
                          : message?.type === 'warning'
                          ? 'bg-warning focus-visible:ring-warning'
                          : 'bg-info focus-visible:ring-info'
                      } inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-[0.95rem] font-bold text-white hover:opacity-80
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:text-base`}
                      onClick={() => setIsMessageOpen(false)}
                    >
                      {message?.button}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default Message;
