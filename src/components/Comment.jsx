import React, { useState } from 'react';
import LikeButtons from './LikeButtons';
import defaultUser from '../assets/avatar-default.png'
import { ReactComponent as ReplyIcon } from '../assets/icon-reply.svg'
import { ReactComponent as DeleteIcon } from '../assets/icon-delete.svg'
import { ReactComponent as EditIcon } from '../assets/icon-edit.svg'
import CommentInput from './CommentInput';
import { useGlobalContext } from '../context';
import Replies from '../containers/Replies';
import moment from 'moment';

const Comment = ({body, createdAt, likes, replies, wroteBy, _id, sectionWidth, openModal, commentId, setCommentId, likedBy, dislikedBy, comments, setComments}) => {
  const { user: { userId } } = useGlobalContext()
  const [isReplying, setIsReplying] = useState(false)
  const [replyingTo, setReplyingTo] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const splitted = body.split(' ')
  let firstWord = splitted.shift()

  const shouldHighlight = () => {
    if(firstWord[0] === '@') {
      return true
    }
    return false
  }

  let userBtns = (
        <span className='text-lg tracking-wide font-medium text-primary-moderate-blue cursor-pointer' onClick={() => {
          setIsReplying(true)
          setReplyingTo(wroteBy.username)
          setCommentId(_id)
        }}>
          <ReplyIcon className='inline-block mr-2' style={{scale: '1.3'}} />
          Reply
        </span>
  )

  if(userId === wroteBy._id) {
    userBtns = (
      <div className='flex gap-4'>
        <span className='text-lg tracking-wide font-medium text-primary-soft-red cursor-pointer' onClick={() => {
          openModal()
          setCommentId(_id)
        }}>
          <DeleteIcon className='inline-block mr-1 -translate-y-0.5' />
          Delete
        </span>
        <span className='text-lg tracking-wide font-medium text-primary-moderate-blue cursor-pointer' onClick={() => {
          setIsEditing(true)
          setCommentId(_id)
        }} >
          <EditIcon className='inline-block mr-1 -translate-y-0.5' />
          Edit
        </span>
      </div>
    )
  }

  return (
    <>
      <section className={`relative flex flex-col flex-wrap ${isReplying ? 'mb-2' : 'mb-5'} p-5 bg-neutral-white rounded-lg md:flex-row md:flex-nowrap md:items-start`}>
        <div className='tracking-wide w-full'>
          <header className='flex items-center'>
            <div className='w-10 shrink-0'>
              <img src={wroteBy.avatar || defaultUser} alt="default user" className='w-full' />
            </div>
            <h4 className='ml-4 mr-2 font-bold text-lg'>{wroteBy.username}</h4>
            {userId === wroteBy._id && (
              <span className='bg-primary-moderate-blue text-neutral-very-light-gray text-sm px-2'>you</span>
            )}
            <p className='tracking-wide pl-6'>{moment.utc(createdAt).fromNow()}</p>
          </header>
          <div>
            {!isEditing ? (
              <p className='mt-5 mb-7 text-md text-neutral-dark-blue md:mt-3 md:mb-0'><span className={shouldHighlight() ? 'highlight' : ''}>{firstWord}</span> {splitted.join(' ')}</p>
                ) : (
                  <CommentInput body={body} commentId={commentId} isEditing={isEditing} setIsEditing={setIsEditing} comments={comments} setComments={setComments} />
                )
            }
          </div>
        </div>
        <div className='flex items-center justify-between md:-order-1'>
          <LikeButtons likes={likes} commentId={_id} likedBy={likedBy} dislikedBy={dislikedBy} />
          <div className='md:absolute md:top-5 md:right-5 md:translate-y-1/4'>
            {userBtns}
          </div>
        </div>
      </section>
      {isReplying && <CommentInput isReplying={isReplying} setIsReplying={setIsReplying} commentId={commentId} replyingTo={replyingTo} comments={comments} setComments={setComments} />}
      {replies && <Replies replies={replies} width={sectionWidth} openModal={openModal} commentId={commentId} setCommentId={setCommentId} isEditing={isEditing} setIsEditing={setIsEditing} comments={comments} setComments={setComments} />}
    </>
  );
};

export default Comment;