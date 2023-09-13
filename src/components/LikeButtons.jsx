import React, { useState } from 'react';
import { ReactComponent as MinusIcon } from '../assets/icon-minus.svg'
import { ReactComponent as PlusIcon } from '../assets/icon-plus.svg';
import { useCustomFetch } from '../axios';
import { useGlobalContext } from '../context';
import { toast } from 'react-toastify';

const LikeButtons = ({likes, commentId, likedBy, dislikedBy}) => {
  const { user: { userId, isAuth } } = useGlobalContext()
  const { fetch } = useCustomFetch()
  const [likesInfo, setLikesInfo] = useState({
    likes: likes,
    like: {
      clicked: likedBy.includes(userId)
    },
    dislike: {
      clicked: dislikedBy.includes(userId)
    }
  })

    const increase = async () => {
    if(!isAuth) {
      return toast('Please log in to upvote', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        toastId: "customId"
      })
    }

    if(likesInfo.like.clicked) {
      setLikesInfo({
        likes: likesInfo.likes - 1, 
        like: {clicked: false}, 
        dislike: {clicked: false}
      })
    } else if(likesInfo.dislike.clicked) {
      setLikesInfo({
        likes: likesInfo.likes + 1, 
        like: {clicked: false}, 
        dislike: {clicked: false}
      })
    } else {
      setLikesInfo({
        likes: likesInfo.likes + 1, 
        like: {clicked: true}, 
        dislike: {clicked: false}
      })
    }

    try {
      await fetch('/like', 'post', {commentId})
    } catch (error) {
      console.log(error);
    }
  }

  const decrease = async () => {
    if(!isAuth) {
      return toast('Please log in to downvote', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        toastId: "customIda"
      })
    }

    if(likesInfo.dislike.clicked) {
       setLikesInfo({
        likes: likesInfo.likes + 1, 
        like: {clicked: false}, 
        dislike: {clicked: false}
      })
    } else if(likesInfo.like.clicked) {
       setLikesInfo({
        likes: likesInfo.likes - 1, 
        like: {clicked: false}, 
        dislike: {clicked: false}
      })
    } else {
      setLikesInfo({
        likes: likesInfo.likes - 1, 
        like: {clicked: false}, 
        dislike: {clicked: true}
      })
    }

    try {
      await fetch('/dislike', 'post', {commentId})
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-min flex items-center gap-2 py-3 px-2 rounded-xl bg-neutral-very-light-gray md:flex-col md:mr-5 md:py-1'>
      <div className='box' onClick={increase}>
        <PlusIcon className={likesInfo.like.clicked ? 'clicked' : ''} style={{scale: '1.5'}}/>
      </div>
      <div className='text-primary-moderate-blue font-bold text-lg'>
        {likesInfo.likes}
      </div>
      <div className='box' onClick={decrease}>
        <MinusIcon className={likesInfo.dislike.clicked ? 'clicked' : ''} style={{scale: '1.5', transform: 'translateY(4px)'}}/>
      </div>
    </div>
  );
};

export default LikeButtons;