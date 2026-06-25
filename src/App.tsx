import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const { toggleTheme, isDark } = useDarkMode();

  return (
    <Layout
      isDark={isDark}
      onToggleTheme={toggleTheme}
      title="MemberFlow Workspace"
    >
      <Dashboard />
    </Layout>
  );
}

export default App;
