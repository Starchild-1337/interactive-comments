import React, { useState, useRef, useEffect} from 'react';
import Comment from '../components/Comment';
import CommentInput from '../components/CommentInput';
import Modal from '../components/Modal';
import { useCustomFetch } from '../axios';
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { ToastContainer } from 'react-toastify';

const Feed = () => {
  const { user: { isAuth } } = useGlobalContext()
  const { fetch } = useCustomFetch()

  const [comments, setComments] = useState([])
  const [sectionWidth, setSectionWidth] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [commentId, setCommentId] = useState(null)

  let sectionRef = useRef()

  useEffect(() => {
    getComments()
    // eslint-disable-next-line
  }, [])
  
  useEffect(() => {
    let observerRefValue = null

    const observer = new ResizeObserver(entries => {
      setSectionWidth(entries[0].contentRect.width);
    })

    if(sectionRef.current) {
      observer.observe(sectionRef.current)
      observerRefValue = sectionRef.current
    }
    
    return () => observerRefValue && observer.unobserve(observerRefValue)
  }, [loading])

  
  const getComments = async () => {
    setLoading(true)
    try {
      const { data } = await fetch('/comments', 'get')
      setComments(data.comments)
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const deleteComment = async () => {
    try {
      await fetch('/delete-comment', 'delete', {commentId})

      let foundComment = comments.find(c => c._id === commentId)

      if(foundComment) {
        let filteredComments = comments.filter(c => c._id !== commentId)
        setComments(filteredComments)
      } else {
        foundComment = comments.find(c => {
          return c.replies.filter(r => (r._id === commentId)).length > 0;
        })
        foundComment.replies = foundComment.replies.filter(r => r._id !== commentId)
        setComments([...comments])
      }
    } catch (error) {
      console.log(error);
    }
    closeModal()
  }

  const logout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    window.location.reload()
  }

  if(loading) {
    return (
      <main className='h-screen flex justify-center items-center'>
        <Puff color='#c3c4ef' />
      </main>
    )
  }

  return (
    <main className='relative py-16'>
      <ToastContainer />
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <h4 className='text-xl font-medium'>Delete comment</h4>
          <p className='my-3 text-sm text-neutral-grayish-blue'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
          <div className='flex justify-between gap-3'>
            <button className='p-2 flex-1 uppercase bg-neutral-dark-blue text-neutral-white rounded-md' onClick={closeModal}>no, cancel</button>
            <button className='p-2 flex-1 uppercase bg-primary-soft-red text-neutral-white rounded-md' onClick={deleteComment}>yes, delete</button>
          </div>
        </Modal>
      )}
      {!isAuth ? (
        <div className='p-1 border-b border-b-primary-pale-red text-3xl text-primary-soft-red font-jaldi font-bold absolute top-2.5 right-8 cursor-pointer xl:right-40'>
          <Link to='login'>
            login
          </Link>
        </div>
      ) : (
        <div className='p-1 border-b border-b-primary-pale-red text-3xl text-primary-soft-red font-jaldi font-bold absolute top-2.5 right-8 cursor-pointer xl:right-40' onClick={logout}>
            logout
        </div>
      )}
      <section ref={sectionRef} className='w-11/12 max-w-3xl mx-auto'>
        {comments.map(comment => {
          return <Comment {...comment} key={comment._id} sectionWidth={sectionWidth} openModal={openModal} commentId={commentId} setCommentId={setCommentId} comments={comments} setComments={setComments}/>
        })}
        <CommentInput comments={comments} setComments={setComments}/>
      </section>
    </main>
  );
};

export default Feed;