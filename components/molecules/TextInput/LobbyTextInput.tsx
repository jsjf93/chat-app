import { ErrorMessage, Field, FieldProps } from 'formik';
import styled from 'styled-components';

type Props = {
  field: string;
  fieldName: string;
};

export function LobbyTextInput({ field, fieldName }: Props) {
  return (
    <Wrapper>
      <label htmlFor={field}>{fieldName}</label>
      <Field name={field}>
        {(props: FieldProps) => (
          <Input
            type="text"
            hasError={!!props.form.touched[field] && !!props.form.errors[field]}
            {...props.field}
          />
        )}
      </Field>
      <ErrorMessage name={field} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 10rem;
`;

const Input = styled.input<{ hasError: boolean }>`
  border: 1px solid black;
  ${(props) => props.hasError && 'border: 1px solid red;'}
`;
