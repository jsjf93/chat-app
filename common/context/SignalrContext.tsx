import { HubConnection } from '@microsoft/signalr';
import React, { createContext, useState } from 'react';
import { Message } from '../Types';

export type ContextType = {
  hubConnection?: HubConnection;
  messages: Message[];
  currentUser: string;
  room: string;
  updateHubConnection: (hubConnection: HubConnection) => void;
  addMessages: (message: Message[]) => void;
  updateCurrentUser: (user: string) => void;
  updateRoom: (room: string) => void;
};

export const SignalrContext = createContext<ContextType | null>(null);

export const SignalrProvider: React.FC = ({ children }) => {
  const [hubConnection, setHubConnection] = useState<HubConnection | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState('');
  const [room, setRoom] = useState('');

  const updateHubConnection = (newHubConnection: HubConnection) =>
    setHubConnection(newHubConnection);

  const addMessages = (newMessages: Message[]) => {
    setMessages((messages) => [...messages, ...newMessages]);
  };

  const updateCurrentUser = (user: string) => {
    setCurrentUser(user);
  };

  const updateRoom = (room: string) => {
    setRoom(room);
  };

  return (
    <SignalrContext.Provider
      value={{
        hubConnection,
        messages,
        currentUser,
        room,
        updateHubConnection,
        addMessages,
        updateCurrentUser,
        updateRoom,
      }}
    >
      {children}
    </SignalrContext.Provider>
  );
};
