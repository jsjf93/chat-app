import styled from 'styled-components';

const modifiers = {
  currentUser: () => `
    background-color: #4855c9be
  `,
  otherUser: () => `
    background-color: #9b9b9bcf
  `,
};

type Props = {
  isUserMessage: boolean;
};

export const ChatMessage = styled.div<Props>`
  width: fit-content;
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 10px;
  ${(props) => modifiers[props.isUserMessage ? 'currentUser' : 'otherUser']}
`;
