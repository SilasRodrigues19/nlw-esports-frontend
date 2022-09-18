import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import logo from './assets/logo-nlw-esports.svg';

import './styles/main.css';
import { CreateAdModal } from './components/CreateAdModal';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

const App = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then((res) => res.json())
      .then((data) => {
        //console.table(data);
        setGames(data);
      });
  }, []);

  return (
    <>
      <section className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
        <img src={logo} alt='Logo NLW eSports' />
        <h1 className='text-6xl text-white font-black mt-20'>
          Seu{' '}
          <span className='bg-nlw-gradient bg-clip-text text-transparent'>
            duo
          </span>{' '}
          está aqui.
        </h1>

        <div className='grid grid-cols-6 gap-6 mt-16'>
          {games.map(({ id, title, bannerUrl, _count }) => {
            return (
              <GameBanner
                key={id}
                title={title}
                bannerUrl={bannerUrl}
                adsCount={_count.ads}
              />
            );
          })}
        </div>
        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal />
        </Dialog.Root>
      </section>
    </>
  );
};

export default App;
