import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import UserAgreement from './pages/user-agreement.tsx';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/user-agreement' element={<UserAgreement />} />
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error('Failed to find the root element');
}
