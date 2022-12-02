import { format, formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

export const Post = ({ author, content, publishedAt }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(['Fuego papi!']);

  const formattedPublishedAtToNow = formatDistanceToNow(publishedAt, {
    addSuffix: true,
  });

  const formattedPublishedAt = format(publishedAt, "MM/dd/yyyy 'at' HH:mm");

  const deleteComment = content => {
    setComments(prevState => prevState.filter(comment => content !== comment));
  };

  const handleNewCommentChange = event => {
    event.target.setCustomValidity('');
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = event => {
    event.preventDefault();

    setComments(prevComments => [...prevComments, newComment]);

    setNewComment('');
  };

  const isNewCommentEmpty = newComment.trim().length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={formattedPublishedAt} dateTime={publishedAt.toISOString()}>
          {formattedPublishedAtToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'text') {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === 'link') {
            return (
              <p key={line.content}>
                <a href={line.url}>{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          required
          value={newComment}
          onInvalid={event =>
            event.target.setCustomValidity('Por favor, preencha o campo')
          }
          name="comment"
          placeholder="Deixe seu feedback"
          onChange={handleNewCommentChange}
        />

        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.comments}>
        {comments.map(comment => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
};
