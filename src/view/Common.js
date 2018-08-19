import styled from 'styled-components';

const Row = styled.div`
  padding: 10px 0px;
`;

const SubRow = styled.div`
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

export {
  Row,
  SubRow,
  Message,
  SectionHeader,
  Button,
  BigSelect,
  AuthorFootnote,
  CookieFootnote,
};
