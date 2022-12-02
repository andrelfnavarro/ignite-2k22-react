import { Header } from './components/Header';

import styles from './App.module.css';
import './global.css';
import { Post } from './components/Post';
import { Sidebar } from './components/Sidebar';

const posts = [
  {
    id: 1,
    author: {
      name: 'André Navarro',
      avatarUrl: 'https://www.github.com/andrelfnavarro.png',
      role: 'Web Developer',
    },
    content: [
      {
        type: 'text',
        content: 'SUPSUP BIG T SPEAKING',
      },
      {
        type: 'text',
        content: 'GOING LIVE RN, CHECK IT OUT',
      },
      {
        type: 'link',
        content: 'Link',
        url: 'https://twitch.tv/loltyler1',
      },
    ],
    publishedAt: new Date('2021-05-11 11:13:00'),
  },

  {
    id: 2,
    author: {
      name: 'Jason Statham',
      avatarUrl: 'https://www.github.com/rrrahal.png',
      role: 'Actor',
    },
    content: [
      {
        type: 'text',
        content: 'Fala galera!!!',
      },
      {
        type: 'text',
        content: 'Conteudo novo no meu canal, confiram lá:',
      },
      {
        type: 'link',
        content: 'Link',
        url: 'https://www.youtube.com',
      },
    ],
    publishedAt: new Date(),
  },
];

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map(post => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
