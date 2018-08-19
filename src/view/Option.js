import React, { Component } from 'react';
import styled from 'styled-components';
import {
  SubRow,
} from './Common';

const OptionRow = styled(SubRow)`
  display: flex;
  flex-wrap: no-wrap;
  justify-content: center;

  & > div {
    border-width: 2px;
    border-left-width: 1px;
    border-right-width: 1px;
    border-radius: 0px;
    --taper: 10%;
  }
  & > div:first-child {
    border-left-width: 2px;
    border-top-left-radius: var(--taper);
    border-bottom-left-radius: var(--taper);
  }
  & > div:last-child {
    border-right-width: 2px;
    border-top-right-radius: var(--taper);
    border-bottom-right-radius: var(--taper);
  }
`;

const OptionButtonContainer = styled.div`
  border-style: solid;
  border-color: var(--foreground);
  text-align: center;
  cursor: pointer;
  height: 30px;
  padding: 0px 10px;
  margin: 0px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;

  ${props => props.isFocused && `
    border-color: var(--highlight);
    background-color: var(--highlight);
    color: var(--background);
  `};
`;
export class OptionButton extends Component {
  render() {
    const {
      label,
      value,
      callback,
      isFocused,
    } = this.props;
    const onClick = () => callback(value);
    return (
      <OptionButtonContainer onClick={onClick} isFocused={isFocused}>
        {label}
      </OptionButtonContainer>
    );
  }
}
export {
  OptionRow,
};