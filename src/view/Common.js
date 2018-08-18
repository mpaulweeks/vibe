import styled from 'styled-components';

const Row = styled.div`
  padding: 10px 0px;
`;

const Message = styled.div`
  padding: 2px 0px;
  font-size: 16px;
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
  Message,
  SectionHeader,
  Button,
  BigSelect,
  AuthorFootnote,
  CookieFootnote,
};
