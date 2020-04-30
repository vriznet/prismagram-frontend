import React from 'react';
import { withRouter } from 'react-router-dom';
import ProfilePresenter from './ProfilePresenter';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo-hooks';

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    const [logOut] = useMutation(LOG_OUT);
    return <ProfilePresenter loading={loading} data={data} logOut={logOut} />;
  },
);
