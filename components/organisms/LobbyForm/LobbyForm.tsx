import { Form, Formik, FormikErrors, FormikProps } from 'formik';
import styled from 'styled-components';
import { LobbyTextInput } from '../../molecules/TextInput/LobbyTextInput';

type FormFields = {
  name: string;
  room: string;
};

const validate = (values: FormFields) => {
  const errors: FormikErrors<FormFields> = {};

  if (!values.name) errors.name = 'Required';
  else if (values.name.length > 15) errors.name = 'Must be 15 characters or less';

  if (!values.room) errors.room = 'Required';
  else if (values.room.length > 15) errors.room = 'Must be 20 characters or less';

  return errors;
};

type Props = {
  joinRoom: (name: string, room: string) => void;
};

export function LobbyForm({ joinRoom }: Props) {
  return (
    <Wrapper>
      <Formik
        initialValues={{
          name: '',
          room: '',
        }}
        validate={validate}
        onSubmit={(values) => joinRoom(values.name, values.room)}
      >
        <Form>
          <LobbyTextInput field="name" fieldName="Name" />

          <br />

          <LobbyTextInput field="room" fieldName="Room" />

          <br />

          <button type="submit">Join</button>
        </Form>
      </Formik>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;
