import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { FontStyles, GlobalStyle, Layout } from './components/layout';
import { DBProvider } from './context/DatabaseContext';
import useDarkMode from './hooks/useDarkMode';
import DeckPage from './pages/Deck/DeckPage';
import LabelPage from './pages/Label/LabelPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import { darkTheme, lightTheme } from './theme';

function App() {
  const [darkMode, setMode] = useDarkMode();
  const REFRESH_INTERVAL = 1000 * 60 * 5;
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: REFRESH_INTERVAL, refetchOnWindowFocus: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <DBProvider>
            <FontStyles />
            <GlobalStyle />
            <Layout setMode={setMode} darkMode={darkMode}>
              <Routes>
                <Route path="/" element={<Navigate to="/decks" />} />
                <Route path="/decks" element={<DeckPage />} />
                <Route path="/labels" element={<LabelPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </DBProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
