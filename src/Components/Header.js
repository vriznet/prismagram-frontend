import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Input from './Input';
import useInput from '../Hooks/useInput';
import { Logo, HomeEmpty, CompassEmpty, HeartEmpty, UserEmpty } from './Icon';

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

export default () => {
  const search = useInput('');
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form>
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
          <HeaderLink to="/username">
            <UserEmpty />
          </HeaderLink>
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
};
