import { useContext } from 'react';
import styled from 'styled-components';
import { ContextType, SignalrContext } from '../../../common/context/SignalrContext';
import { Message } from '../../../common/Types';
import { ChatMessage } from '../../atoms/ChatMessage/ChatMessage';

type Props = {
  messages: Message[];
};

export function ChatMessages({ messages }: Props) {
  const { currentUser } = useContext(SignalrContext) as ContextType;

  return (
    <Wrapper>
      {messages.map((message) => (
        <MessageWrapper key={message.id} isUserMessage={message.user === currentUser}>
          <ChatMessage isUserMessage={message.user === currentUser}>{message.message}</ChatMessage>
        </MessageWrapper>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 2rem;
`;

const MessageWrapper = styled.div<{ isUserMessage: boolean }>`
  display: flex;
  ${(props) => props.isUserMessage && 'justify-content: flex-end;'}
  margin-bottom: 1rem;
`;
