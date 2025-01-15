import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import UserAgreement from './pages/user-agreement.tsx';

const router = (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/user-agreement' element={<UserAgreement />} />
    </Routes>
  </BrowserRouter>
);

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(router);
