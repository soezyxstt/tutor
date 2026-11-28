import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './styles.css';
import { TutorApp } from '@tutor/core';
import { demoCourse } from './content/course';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TutorApp course={demoCourse} />
  </StrictMode>
);
