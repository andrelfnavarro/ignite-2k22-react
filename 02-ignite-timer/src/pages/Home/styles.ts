import styled from 'styled-components';

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
  }
`;

const CountdownButton = styled.button`
  width: 100%;
  border: 0;

  padding: 1rem;
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${({ theme }) => theme['gray-100']};

  transition: background-color 0.2s;
  cursor: pointer;
`;

export const StartCountdownButton = styled(CountdownButton)`
  background-color: ${({ theme }) => theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StopCountdownButton = styled(CountdownButton)`
  background-color: ${({ theme }) => theme['red-500']};

  &:hover {
    background-color: ${({ theme }) => theme['red-700']};
  }
`;
