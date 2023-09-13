import React, { useEffect } from 'react';

const Modal = ({children, isModalOpen}) => {
  const top = window.scrollY + 'px'

  useEffect(() => {
    if(isModalOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => document.body.style.overflow = 'unset'
  }, [isModalOpen])

  return (
    <div className={`absolute grid place-items-center left-0 right-0 bottom-0 z-[11]`} style={{background: 'rgb(0, 0, 0, 0.5)', top: top}}>
      <div className='fixed w-[340px] h-[200px] bg-white rounded-lg p-6 opacity-100 top-2/4 -translate-y-2/4 z-[20]'>
          {children}
      </div>
    </div>
  );
};

export default Modal;