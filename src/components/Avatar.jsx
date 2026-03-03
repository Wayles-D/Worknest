// src/components/Avatar.jsx
import React, { useState } from 'react';
import { useInitials } from '../hooks/useInitials';

// Simple hash function to generate a consistent color from a string
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.floor(Math.abs(Math.sin(hash) * 16777215) % 16777215).toString(16);
  return `#${'0'.repeat(6 - color.length)}${color}`;
};

const Avatar = ({ src, name, alt, size = 40, ...props }) => {
  const [error, setError] = useState(false);
  const initials = useInitials(name);
  const bgColor = stringToColor(name || '');

  if (!src || error) {
    // Fallback to initials
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: size * 0.4,
          textTransform: 'uppercase',
        }}
        {...props}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || name}
      onError={() => setError(true)}
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
      {...props}
    />
  );
};

export default Avatar;