import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import PostPresenter from './PostPresenter';
import { TOGGLE_LIKE } from './PostQueries';

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
  const comment = useInput('');
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });

  useEffect(() => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
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
