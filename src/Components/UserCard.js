import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from './Avatar';
import FatText from './FatText';
import FollowButton from './FollowButton/';
import { Link } from 'react-router-dom';

const Card = styled.div`
  ${(props) => props.theme.whiteBox}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ExtAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const ExtLink = styled(Link)`
  color: ${(props) => props.theme.blackColor};
  margin-bottom: 15px;
`;

const UserCard = ({ username, isFollowing, avatar, isSelf, id }) => {
  return (
    <Card>
      <ExtAvatar url={avatar} size={'md'} />
      <ExtLink to={`/${username}`}>
        <FatText text={username} />
      </ExtLink>
      {!isSelf && <FollowButton isFollowing={isFollowing} id={id} />}
    </Card>
  );
};

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  avatar: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired,
};

export default UserCard;
