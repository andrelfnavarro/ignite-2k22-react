import styled, { DefaultTheme } from 'styled-components';

export const HistoryContainer = styled.main`
  display: flex;
  flex: 1;
  padding: 3.5rem;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${props => props.theme['gray-100']};
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${props => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${props => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 0.5rem;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 0.5rem;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${props => props.theme['gray-700']};
      border-top: 4px solid ${props => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      text-align: left;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;

interface StatusProps {
  status: 'completed' | 'in-progress' | 'canceled';
}

const statusColors: {
  [key in StatusProps['status']]: keyof DefaultTheme;
} = {
  completed: 'green-500',
  'in-progress': 'yellow-500',
  canceled: 'red-500',
};

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${({ status, theme }) => theme[statusColors[status]]};
  }
`;
