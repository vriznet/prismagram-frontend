import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.input`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 35px;
  padding: 0px 15px;
  font-size: 12px;
`;

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type,
  className,
}) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
    className={className}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
