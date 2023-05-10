import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NotFoundPage } from './pages/NotFoundPage';
import { WelcomePage } from './pages/WelcomePage';
import EditorPage from './pages/EditorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/main" element={<EditorPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
