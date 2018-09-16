import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  padding: 10px 0px;

  ${props => props.width && `
    width: ${props.width};
    margin-left: auto;
    margin-right: auto;
  `}
`;

const SubRow = styled(Row)`
  padding: 4px 0px;
  font-size: 16px;
`;

const Message = styled(SubRow)`
  padding: 2px 0px;
`;

const SectionHeader = styled(Message)`
  text-decoration: underline;
  font-size: 18px;
`;

const Button = styled.span`
  display: inline-block;
  cursor: pointer;
  margin: 0px 5px;
  padding: 5px 6px;
  font-size: 16px;
  font-weight: bold;

  border: 2px solid var(--foreground);
  box-shadow: 3px 3px var(--shadow);

  &:hover {
    color: var(--background);
    background-color: var(--foreground);
  }

  ${props => props.highlight && `
    color: var(--background);
    background-color: var(--foreground);
  `}
`;

const BigSelect = styled.select`
  cursor: pointer;
  margin: 0px 5px;
  padding: 3px 6px;
  font-size: 14px;
`;

const AuthorFootnote = styled.div`
  font-size: 14px;
`;
const CookieFootnote = styled.div`
  font-size: 12px;
`;

const ModalContainerOuter = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  width: calc(100% - 20px);
  max-width: 400px;
  transform: translate(-50%, 0%);

  --foreground: white;
  --background: black;
`;

const ModalContainerInner = styled.div`
  position: relative;

  text-align: center;
  font-size: 16px;
  cursor: default;
  background-color: var(--background);
  border: 3px solid var(--foreground);
  padding: 20px;
  background-color: var(--background);
  border: 2px solid var(--foreground);
  /* border-radius: 50px 0px 50px 50px; */
  box-sizing: border-box;
`;

const ModalCornerExit = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;

  --size: 20px;
  width: calc(2 * var(--size));
  height: calc(2 * var(--size));
  box-sizing: border-box;

  cursor: pointer;
  color: var(--foreground);
  background-color: var(--background);
  border: 2px solid var(--foreground);

  &:hover {
    color: var(--background);
    background-color: var(--foreground);
  }

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export {
  Row,
  SubRow,
  Message,
  SectionHeader,
  Button,
  BigSelect,
  AuthorFootnote,
  CookieFootnote,
  ModalContainerOuter,
  ModalContainerInner,
  ModalCornerExit,
  ModalTitle,
};
