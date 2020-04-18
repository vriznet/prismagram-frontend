import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../Hooks/useInput';
import { useMutation, useQuery } from 'react-apollo-hooks';
import PostPresenter from './PostPresenter';
import { TOGGLE_LIKE, ADD_COMMENT } from './PostQueries';
import { ME } from '../../SharedQueries';

const PostContainer = ({
  id,
  caption,
  location,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput('');
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  });

  const { data } = useQuery(ME);

  useEffect(() => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      const timeoutId = setTimeout(() => setCurrentItem(0), 3000);
      return clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => setCurrentItem(currentItem + 1), 3000);
      return clearTimeout(timeoutId);
    }
  }, [currentItem, files]);

  const toggleLike = () => {
    toggleLikeMutation();
    if (isLikedState === true) {
      setIsLikedState(false);
      setLikeCountState(likeCountState - 1);
    }
    if (isLikedState === false) {
      setIsLikedState(true);
      setLikeCountState(likeCountState + 1);
    }
  };

  const onKeyPress = (event) => {
    const { which } = event;

    if (which === 13) {
      event.preventDefault();
      comment.setValue('');
      setSelfComments([
        ...selfComments,
        {
          id: Math.floor(Math.random() * 100),
          text: comment.value,
          user: { username: data && data.me && data.me.username },
        },
      ]);
      addCommentMutation();
    }
    return;
  };

  return (
    <React.Fragment>
      <PostPresenter
        caption={caption}
        location={location}
        user={user}
        files={files}
        likeCount={likeCountState}
        isLiked={isLikedState}
        comments={comments}
        createdAt={createdAt}
        newComment={comment}
        setIsLikedState={setIsLikedState}
        setLikeCountState={setLikeCountState}
        avatar={user.avatar}
        currentItem={currentItem}
        toggleLike={toggleLike}
        onKeyPress={onKeyPress}
        selfComments={selfComments}
      />
    </React.Fragment>
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default PostContainer;
