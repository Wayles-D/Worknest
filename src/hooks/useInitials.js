// src/hooks/useInitials.js
import { useMemo } from 'react';
import { getInitials } from '../utils/stringUtils';

export const useInitials = (name) => {
  return useMemo(() => getInitials(name), [name]);
};