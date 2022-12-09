import { HistoryContainer, HistoryList, Status } from './styles';

export const History = () => {
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
            <tr>
              <td>Task 1</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status status="completed">Completed</Status>
              </td>
            </tr>

            <tr>
              <td>Task 1</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status status="in-progress">In progress</Status>
              </td>
            </tr>

            <tr>
              <td>Task 1</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status status="canceled">Stopped</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};
