import Layout from './components/Layout/Layout';
import './App.scss';
import { Suspense } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';
import * as React  from 'react';
import { AuthProvider } from './store/auth';
import Loader from './components/shared/Loader/Loader';

function App() {
  return (
    <Suspense fallback={<Loader />} >
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Layout>
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
