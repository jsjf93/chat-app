import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useRouter } from 'next/dist/client/router';
import { useContext } from 'react';
import { ContextType, SignalrContext } from '../common/context/SignalrContext';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { LobbyForm } from '../components/organisms/LobbyForm/LobbyForm';

export default function Home() {
  const router = useRouter();

  const { updateHubConnection, addMessages, updateCurrentUser, updateRoom } = useContext(
    SignalrContext,
  ) as ContextType;

  const joinRoom = async (name: string, room: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('https://realtime-chat-app.azurewebsites.net/chat')
        .configureLogging(LogLevel.Information)
        .build();

      connection.on('ReceiveMessage', (id: string, user: string, message: string) => {
        console.log('message received:', message);
        addMessages([{ id, user, message }]);
      });

      await connection.start();
      await connection.invoke('JoinRoom', { user: name, room });

      updateHubConnection(connection);
      updateCurrentUser(name);
      updateRoom(room);

      router.push('chat');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <PageTitle name="Chat Lobby" />

      <LobbyForm joinRoom={joinRoom} />
    </div>
  );
}
