import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/outfit';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrivacyPage } from './components/PrivacyPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivacyPage />
  </StrictMode>,
);
