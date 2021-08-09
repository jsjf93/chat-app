import { useRouter } from 'next/dist/client/router';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useContext } from 'react';
import { ContextType, SignalrContext } from '../common/context/SignalrContext';
import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { ChatMessages } from '../components/molecules/ChatMessages/ChatMessages';

export default function Chat() {
  const router = useRouter();

  const { messages, hubConnection, currentUser, room } = useContext(SignalrContext) as ContextType;

  const handleSubmit = async (
    message: string,
    { resetForm }: FormikHelpers<{ message: string }>,
  ) => {
    try {
      await hubConnection?.invoke('SendMessage', { user: currentUser, room, message });
      resetForm();
    } catch (e) {
      console.log(e);
    }
  };

  const leaveRoom = async () => {
    try {
      await hubConnection?.invoke('LeaveRoom', { user: currentUser, room });
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <PageTitle name={room} />

      <div>
        <button onClick={leaveRoom}>Leave</button>
      </div>

      <ChatMessages messages={messages} />

      <Formik
        initialValues={{ message: '' }}
        onSubmit={(values, helpers) => handleSubmit(values.message, helpers)}
      >
        <Form>
          <label htmlFor={'message'}>Message</label>
          <Field name={'message'} type="text" />
          <button type="submit">Send</button>
        </Form>
      </Formik>
    </div>
  );
}
