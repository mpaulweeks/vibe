import styled from 'styled-components';

const Row = styled.div`
  padding: 10px 0px;
`;

const Message = styled.div`
  padding: 2px 0px;
`;

const SectionHeader = styled(Message)`
  text-decoration: underline;
  font-size: 18px;
`;


const Button = styled.button`
  margin: 0px 5px;
  padding: 3px 6px;
  font-size: 14px;
`;

export {
  Row,
  Message,
  SectionHeader,
  Button,
};
