import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext';
import { HistoryContainer, HistoryList, Status } from './styles';

export const History = () => {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map(cycle => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutes} minutes</td>
                <td>{cycle.startedAt.toLocaleDateString()}</td>
                <td>
                  {cycle.finishedAt && (
                    <Status status="completed">Completed</Status>
                  )}

                  {cycle.stoppedAt && !cycle.finishedAt && (
                    <Status status="canceled">Stopped</Status>
                  )}

                  {!cycle.stoppedAt && !cycle.finishedAt && (
                    <Status status="in-progress">Active</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};
