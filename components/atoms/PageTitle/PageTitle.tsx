import styled from 'styled-components';

type Props = {
  name: string;
};

export function PageTitle({ name }: Props) {
  return (
    <Wrapper>
      <h1>{name}</h1>
      <hr />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
`;
