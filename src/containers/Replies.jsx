import Comment from '../components/Comment';

const Replies = ({width, replies, openModal, commentId, setCommentId, isEditing, setIsEditing, comments, setComments}) => {
  const calculateRepliesWidth = () => {
    if(width <= 400) {
      return 100
    }
    return 100 - (width - 400) / 70
  }

  let padding = width / 100 * 6 + 'px'

  return (
    <div className={`ml-auto border-l-2 border-neutral-light-gray`} style={{width: calculateRepliesWidth() + '%', paddingLeft: padding}}>
      {replies.map(comment => {
        return <Comment {...comment} key={comment._id} openModal={openModal} commentId={commentId} setCommentId={setCommentId} isEditing={isEditing} setIsEditing={setIsEditing} comments={comments} setComments={setComments}/>
      })}
    </div>
  );
};

export default Replies;