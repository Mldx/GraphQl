import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'components/Layout';
import { NotFoundPage } from 'pages/NotFoundPage';
import { WelcomePage } from 'pages/WelcomePage';
import EditorPage from 'pages/EditorPage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/main" element={<EditorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
