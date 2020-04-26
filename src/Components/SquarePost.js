import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HeartFull, CommentFull } from './Icon';

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s linear;
  svg {
    fill: white;
  }
`;

const Container = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
  cursor: pointer;
`;

const Number = styled.div`
  color: white;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 25px;
  }
`;

const NumberText = styled.span`
  margin-left: 7px;
  font-size: 16px;
  font-weight: 700;
`;

const SquarePost = ({ likeCount, commentCount, file }) => {
  return (
    <Container bg={file.url}>
      <Overlay>
        <Number>
          <HeartFull />
          <NumberText>{likeCount}</NumberText>
        </Number>
        <Number>
          <CommentFull />
          <NumberText>{commentCount}</NumberText>
        </Number>
      </Overlay>
    </Container>
  );
};

SquarePost.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.shape({
    url: PropTypes.string,
  }),
};

export default SquarePost;
