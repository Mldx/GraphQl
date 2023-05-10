import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NotFound } from './pages/notFound';
import { Welcome } from './pages/welcome';
import Editor from './pages/EditorPage/EditorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/main" element={<Editor />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
