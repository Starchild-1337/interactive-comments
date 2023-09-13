import React, { useEffect, useState } from 'react';
import { useCustomFetch } from '../axios';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userInput, setUserInput] = useState('')
  const [inputError, setInputError] = useState('')
  const [loading, setLoading] = useState(false)
  const { fetch } = useCustomFetch()
  const { setUser, user: { isAuth } } = useGlobalContext()
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])

  const handleSubmit = e => {
    e.preventDefault()

    const username = userInput.trim()

    if(username.length < 2) {
      setInputError('username should contain at least 2 characters')
    } else if(username.length > 15) {
      setInputError("username can't be longer than 15 characters")
    } else {
      setInputError('')
      loginUser(username)
    }  
  }

  const loginUser = async (username) => {
    setLoading(true)
    try {
      const user = await fetch('/login', 'post', {username})
      const {data: { userId, token }} = user
      setUser({userId, token, isAuth: true})

      localStorage.setItem('userId', user.data.userId)
      localStorage.setItem('token', user.data.token)
      navigate('/')
    } catch (error) {
      const msg = error.response.data.message
      setInputError(msg)
    }
    setLoading(false)
  }
  
  return (
    <div className='py-5 px-8 mb-5 bg-neutral-white rounded-lg w-11/12 max-w-md mt-8 mx-auto text-center shadow-md'>
      <h1 className='text-lg text-neutral-dark-blue mb-6'>Please log in to add a comment</h1>
      <form onSubmit={handleSubmit}>
        <input disabled={loading} className={`placeholder:text-slate-400 bg-white w-full border ${inputError ? "border-primary-soft-red" : "border-neutral-light-gray"}  rounded-md py-2 pl-4 mt-4 pr-3 shadow-sm focus:outline-none focus:border-neutral-grayish-blue`} placeholder="Username" type="text" name="username" id="username" onChange={(e) => setUserInput(e.target.value)} onFocus={() => setInputError('')} />
        {inputError && (
          <span className='text-xs text-primary-soft-red text-left block mt-1'>{inputError}</span>
        )}
        <button type='submit' className='w-28 p-2 mt-6 bg-primary-soft-red text-neutral-white rounded-md disabled:bg-primary-pale-red disabled:cursor-not-allowed' disabled={loading}>log in</button>
      </form>
    </div>
  );
};

export default Login;