import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  labelText?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, disabled, ...rest }) => {
  const { id, labelText } = rest;
  return (
    <Container>
      {Icon && <Icon size={30} />}
      <label htmlFor={id}>
        {labelText ? `${labelText}:` : ''}
        <input
          data-testid="inputEl"
          disabled={disabled}
          {...rest}
          type="text"
        />
      </label>
    </Container>
  );
};

export default Input;
