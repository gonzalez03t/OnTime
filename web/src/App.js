import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Routes from './Routes/Routes.js';
import { NotificationContainer } from 'react-notifications';

export default function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>

      <NotificationContainer />
    </>
  );
}
