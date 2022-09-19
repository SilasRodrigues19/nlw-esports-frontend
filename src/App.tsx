import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import logo from './assets/logo-nlw-esports.svg';

import './styles/main.css';
import { CreateAdModal } from './components/CreateAdModal';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Keyboard, Pagination, Navigation } from 'swiper';
import { Octo } from './components/Octo';

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
      <Octo />
      <section className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
        <img src={logo} alt='Logo NLW eSports' className='w-32' />
        <h1 className='text-6xl text-white font-black mt-20'>
          Seu{' '}
          <span className='bg-nlw-gradient bg-clip-text text-transparent'>
            duo
          </span>{' '}
          está aqui.
        </h1>

        <Swiper
          className='w-full mt-24 mb-4'
          slidesPerView={4}
          spaceBetween={15}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: false,
          }}
          navigation={true}
          modules={[Keyboard, Navigation]}
        >
          <div className='grid grid-cols-6 gap-6 mt-16'>
            {games.map(({ id, title, bannerUrl, _count }) => {
              return (
                <SwiperSlide>
                  <GameBanner
                    key={id}
                    title={title}
                    bannerUrl={bannerUrl}
                    adsCount={_count.ads}
                  />
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>

        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal />
        </Dialog.Root>
      </section>
    </>
  );
};

export default App;
