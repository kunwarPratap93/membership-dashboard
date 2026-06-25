import Layout from './components/layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { useDarkMode } from './hooks/useDarkMode.js';

function App() {
  const { toggleTheme, isDark } = useDarkMode();

  return (
    <Layout
      isDark={isDark}
      onToggleTheme={toggleTheme}
      title="Membership Workspace"
    >
      <Dashboard />
    </Layout>
  );
}

export default App;
