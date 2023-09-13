import { useRef, useEffect, useState } from 'react';
import defaultUser from '../assets/avatar-default.png'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { useCustomFetch } from '../axios';

const CommentInput = ({isReplying, setIsReplying, commentId, replyingTo, isEditing, setIsEditing, body, comments, setComments}) => {
  const { user: { isAuth } } = useGlobalContext()
  const { fetch } = useCustomFetch()
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  const inputRef = useRef();

  useEffect(() => {
    if(isReplying) {
      inputRef.current.focus();
      inputRef.current.value = `@${replyingTo} `
      setComment(inputRef.current.value)
    }

    if(isEditing) {
      inputRef.current.focus();
      setComment(body)
    }
  }, [isReplying, isEditing, replyingTo, body]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!isAuth) {
      return navigate('/interactive-comments/login')
    }

    let endpoint = '/add-comment'
    let method = 'post'

    let data = {
      body: comment,
      commentId: null
    }

    if(isReplying) {
      data.commentId = commentId
    }

    if(isEditing) {
      data.commentId = commentId
      endpoint = '/edit-comment'
      method = 'put'
    }

    try {
      const resData = await fetch(endpoint, method, data)
      if(isReplying) {
        let foundComment = comments.find(c => c._id === commentId)
        
        if(!foundComment) {
          foundComment = comments.find(c => {
            return c.replies.filter(r => (r._id === commentId)).length > 0;
          })
        }
        
        const foundCommentIndex = comments.findIndex(c => c._id === foundComment._id)
        foundComment.replies.push(resData.data.comment)
        comments.splice(foundCommentIndex, 1, foundComment)
        setComments([...comments])
        setIsReplying(false)
      } else if(isEditing) {
        let foundComment = comments.find(c => c._id === commentId)
        if(!foundComment) {
          comments.forEach(c => {
            let foundReply = c.replies.find(r => r._id === commentId)
            if(foundReply) {
              foundComment = foundReply
            }
          })
        }
        foundComment.body = comment
        setIsEditing(false)
        setComments([...comments])
      } else {
        setComments([...comments, resData.data.comment])
      }
      setComment('')
    } catch (error) {
      console.log(error);
    }
  }

  let form = (
      <form onSubmit={handleSubmit} className='flex justify-between flex-wrap gap-4 md:flex-row md:flex-nowrap'>
        <textarea ref={inputRef} name="comment" id="comment" className='w-full h-[100px] px-4 py-2 border rounded-lg border-neutral-light-gray resize-none focus:outline-none focus:border-neutral-grayish-blue' placeholder='Add a comment...' value={comment} onChange={(e) => setComment(e.target.value)}>
        </textarea>
        <div className='w-12 shrink-0 md:-order-1'>
          <img src={defaultUser} alt="default user" className='w-full' />
        </div>
        <div className='md:flex md:flex-col md:justify-between md:justify-self-stretch'>
          {isReplying && <button type='button' className='text-md text-primary-soft-red p-1 mr-4 font-medium md:order-last md:mr-0' onClick={() => setIsReplying(false)}>Cancel</button>}
          <button type='submit' className='w-24 p-2 bg-primary-moderate-blue uppercase text-neutral-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed' disabled={!comment.trim()}>{isReplying ? 'Reply' : 'Send'}</button>
        </div>
      </form>
  )
  
  if(isEditing) {
    form = (
      <form onSubmit={handleSubmit} className='flex flex-wrap gap-4'>
        <textarea ref={inputRef} name="comment" id="comment" className='w-full h-[100px] p-3 border rounded-lg border-neutral-light-gray resize-none focus:outline-none focus:border-neutral-grayish-blue' placeholder='Add a comment...' value={comment} onChange={(e) => setComment(e.target.value)}>
        </textarea>
        <div className='flex gap-5'>
          <button type='submit' className='w-24 p-2 bg-primary-moderate-blue uppercase text-neutral-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed' disabled={!comment}>Update</button>
          <button type='button' className='text-md text-primary-soft-red p-1 mr-4 font-medium md:order-last md:mr-0' onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </form>
    )
  }

  return (
    <section className={`${isEditing ? 'p-0 my-5' : 'p-5 mb-5'} bg-neutral-white rounded-lg`}>
      {form}
    </section>
  );
};

export default CommentInput;