import styles from './Avatar.module.css';

export const Avatar = ({ src, borderless }) => {
  return (
    <img
      src={src}
      className={borderless ? styles.avatar : styles.avatarWithBorder}
    />
  );
};
