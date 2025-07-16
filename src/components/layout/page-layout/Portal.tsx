import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

export default function Portal({ children }: { children: ReactNode }) {
  if (typeof window === 'undefined') return null;
  const el = document.getElementById('portal-root') || document.body;
  return createPortal(children, el);
}
