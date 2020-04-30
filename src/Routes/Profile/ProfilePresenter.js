import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Loader from '../../Components/Loader';
import Avatar from '../../Components/Avatar';
import FatText from '../../Components/FatText';
import Button from '../../Components/Button';
import FollowButton from '../../Components/FollowButton/';
import SquarePost from '../../Components/SquarePost';

const Wrapper = styled.div`
  min-height: 60vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 60px;
`;

const AvatarColumn = styled.div`
  display: flex;
  justify-content: center;
  min-width: 292px;
`;

const DataColumn = styled.div``;

const Username = styled.span`
  display: block;
  font-size: 28px;
  line-height: 28px;
  font-weight: 100;
  margin-right: 15px;
`;

const UsernameRow = styled.span`
  display: flex;
  align-items: center;
  width: 250px;
  margin-bottom: 20px;
`;

const Counts = styled.ul`
  display: flex;
  margin-bottom: 20px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled.span`
  display: block;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Bio = styled.p`
  font-size: 16px;
`;

const Posts = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 293px);
  grid-template-rows: 293px;
  grid-auto-rows: 293px;
`;

export default ({ loading, data, logOut }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
      },
    } = data;
    return (
      <React.Fragment>
        <Helmet>
          <title>{username} | Prismagram</title>
        </Helmet>
        <Header>
          <AvatarColumn>
            <Avatar size="lg" url={avatar} />
          </AvatarColumn>
          <DataColumn>
            <UsernameRow>
              <Username>{username}</Username>
              {isSelf ? (
                <Button text="Log Out" onClick={logOut} />
              ) : (
                <FollowButton id={id} isFollowing={isFollowing} />
              )}
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={String(postsCount)} /> posts
              </Count>
              <Count>
                <FatText text={String(followersCount)} /> followers
              </Count>
              <Count>
                <FatText text={String(followingCount)} /> following
              </Count>
            </Counts>
            <FullName>
              <FatText text={fullName} />
            </FullName>
            <Bio>{bio}</Bio>
          </DataColumn>
        </Header>
        <Posts>
          {posts &&
            posts
              .reverse()
              .map((post) => (
                <SquarePost
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  file={post.files[0]}
                  key={post.id}
                />
              ))}
        </Posts>
      </React.Fragment>
    );
  }
};
