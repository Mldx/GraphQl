import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NotFoundPage } from './pages/NotFoundPage';
import { Welcome } from './pages/welcome';
import EditorPage from './pages/EditorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/main" element={<EditorPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
