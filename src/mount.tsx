import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/outfit';
import './index.css';
import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

/** Arranque partilhado por todas as páginas (fontes, estilos, StrictMode). */
export function mount(page: ReactNode): void {
  createRoot(document.getElementById('root')!).render(<StrictMode>{page}</StrictMode>);
}
