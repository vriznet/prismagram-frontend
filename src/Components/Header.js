import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import Input from './Input';
import useInput from '../Hooks/useInput';
import { Logo, HomeEmpty, CompassEmpty, HeartEmpty, UserEmpty } from './Icon';
import { useQuery } from 'react-apollo-hooks';

const Header = styled.header`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  border: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  &:first-child {
    margin-right: auto;
  }
  &:last-child {
    margin-left: auto;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
    text-align: center;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const ME = gql`
  {
    me {
      username
    }
  }
`;

export default () => {
  const history = useHistory();
  const search = useInput('');
  const { data } = useQuery(ME);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput {...search} placeholder="Search" />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/">
            <HomeEmpty />
          </HeaderLink>
          <HeaderLink to="/explore">
            <CompassEmpty />
          </HeaderLink>
          <HeaderLink to="/notification">
            <HeartEmpty />
          </HeaderLink>
          {data?.me && (
            <HeaderLink to={data?.me?.username}>
              <UserEmpty />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
};
