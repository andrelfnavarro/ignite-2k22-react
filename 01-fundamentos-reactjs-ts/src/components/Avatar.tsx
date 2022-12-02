import React from 'react';
import styles from './Avatar.module.css';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  borderless?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ src, borderless, ...rest }) => {
  return (
    <img
      src={src}
      className={borderless ? styles.avatar : styles.avatarWithBorder}
      {...rest}
    />
  );
};
