import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import usePersistedState from './utils/usePersistedState'

import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from './styles/global'
import Header from './components/Header';
import light from './styles/themes/light'
import dark from './styles/themes/dark'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContext'


const App = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light)

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Header toogleTheme={toggleTheme} />
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Link to="/url-desejada">Voltar</Link>
            <Route path="/rooms/:id" component={Room} />

            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </ThemeProvider>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;