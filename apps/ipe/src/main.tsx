import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './styles.css';
import { TutorApp, useTutorStore } from '@tutor/core';
import { course } from './content/course';
import { registerIpeSimulations } from './simulations/register';
import './simulations/styles.css';
import { migrateIpeBrowserState } from './migrate-progress';

registerIpeSimulations();
migrateIpeBrowserState(course, useTutorStore);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TutorApp course={course} />
  </StrictMode>
);
