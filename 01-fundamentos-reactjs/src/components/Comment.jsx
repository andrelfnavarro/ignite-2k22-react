import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

export const Comment = ({ content, onDeleteComment }) => {
  const [likeCount, setLikeCount] = useState(0);

  const handleDelete = () => {
    console.log('delete');
    onDeleteComment(content);
  };

  const handleLike = () => {
    setLikeCount(prevState => prevState + 1);
  };

  return (
    <div className={styles.comment}>
      <Avatar borderless src="https://www.github.com/andrelfnavarro.png" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>André</strong>
              <time title="11 de Maio às 11:13" dateTime={new Date()}>
                1h atrás
              </time>
            </div>

            <button onClick={handleDelete} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLike}>
            <ThumbsUp /> Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
