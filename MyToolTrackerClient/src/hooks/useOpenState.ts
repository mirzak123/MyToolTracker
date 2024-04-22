import { useState } from 'react';

const useOpenState = (initialState?: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState ?? false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return { isOpen, open, close, toggle };
}

export default useOpenState;
