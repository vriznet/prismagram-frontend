import React from 'react';
import styled from 'styled-components';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  action,
  setAction,
  username,
  firstName,
  lastName,
  email,
  secret,
  onSubmit,
}) => (
  <Wrapper>
    <Form>
      {action === 'logIn' && (
        <form onSubmit={onSubmit}>
          <Input {...email} placeholder={'Email'} type="email" />
          <Button text={'Log In'} />
        </form>
      )}
      {action === 'signUp' && (
        <form onSubmit={onSubmit}>
          <Input {...firstName} placeholder={'First name'} />
          <Input {...lastName} placeholder={'Last name'} />
          <Input {...username} placeholder={'Username'} />
          <Input {...email} placeholder={'Email'} type="email" />
          <Button text={'Sign Up'} />
        </form>
      )}
      {action === 'confirm' && (
        <form onSubmit={onSubmit}>
          <Input placeholder="Paste your secret" required {...secret} />
          <Button text={'Confirm'} />
        </form>
      )}
    </Form>
    <StateChanger>
      {action === 'logIn' ? (
        <React.Fragment>
          Don't have an account?{' '}
          <Link onClick={() => setAction('signUp')}>Sign up</Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          Have an account?{' '}
          <Link onClick={() => setAction('logIn')}>Log in</Link>
        </React.Fragment>
      )}
    </StateChanger>
  </Wrapper>
);
