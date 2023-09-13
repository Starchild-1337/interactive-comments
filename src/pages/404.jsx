    import React from 'react';
    import { Link, useRouteError } from 'react-router-dom';

    const ErrorPage = () => {
      const error = useRouteError()
      
      return (
        <div className='w-full h-screen flex flex-col items-center mt-28'>
          <h1 className='text-8xl text-neutral-grayish-blue'>Error <span className='text-8xl text-primary-soft-red'>{error.status}</span></h1>
          <p className='text-4xl text-neutral-grayish-blue my-10'>{error.statusText}</p>
          <Link to={'/interactive-comments'} className='p-2 bg-neutral-dark-blue text-neutral-white rounded-md'>Back Home</Link>
        </div>
      );
    };

    export default ErrorPage;