import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import logo from './assets/logo-nlw-esports.svg';

import './styles/main.css';
import { CreateAdModal } from './components/CreateAdModal';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import { Octo } from './components/Octo';
import { CaretLeft, CaretRight } from 'phosphor-react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [slide, setSlide] = useState(0);
  const [loaded, isLoaded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then((res) => res.json())
      .then((data) => {
        //console.table(data);
        setGames(data);
      });
  }, []);

  const maxValue = 8;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    mode: 'free-snap',
    slides: {
      origin: 'auto',
      perView: 3,
      spacing: 15,
      number: games.length,
    },
    range: {
      min: 0,
      max: maxValue,
    },
    slideChanged(slider) {
      setSlide(slider.track.details.rel);
    },
    created() {
      isLoaded(true);
    },
  });

  return (
    <>
      <Octo />
      <ToastContainer />
      <section className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
        <img src={logo} alt='Logo NLW eSports' className='w-32' />
        <h1 className='text-6xl text-white font-black mt-20'>
          Seu{' '}
          <span className='bg-nlw-gradient bg-clip-text text-transparent'>
            duo
          </span>{' '}
          está aqui.
        </h1>

        <div className='flex justify-between items-center'>
          <button
            disabled={slide === 0}
            type='button'
            onClick={() => instanceRef.current?.prev()}
          >
            <CaretLeft
              className={`mx-24 h-14 w-14 ${
                slide === 0
                  ? 'text-zinc-400 hover:text-zinc-400 cursor-not-allowed'
                  : 'text-purple-500 hover:text-purple-600'
              }`}
            />
          </button>

          <div
            ref={sliderRef}
            className='keen-slider w-full max-w-5xl gap-6 mt-16'
          >
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

          {loaded && instanceRef.current && (
            <button type='button' onClick={() => instanceRef.current?.next()}>
              <CaretRight
                className={`mx-24 h-14 w-14 ${
                  slide === maxValue - 2
                    ? /* instanceRef.current.track.details.slides.length - 1 */
                      'text-zinc-400 hover:text-zinc-400 cursor-not-allowed'
                    : 'text-purple-500 hover:text-purple-600'
                }`}
              />
            </button>
          )}
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
