import { ThemeProvider } from 'styled-components';
import { Button } from './components/Button';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyles } from './styles/themes/global';

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
      <Button variant="secondary" />
      <Button />

      <GlobalStyles />
    </ThemeProvider>
  );
};
