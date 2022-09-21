interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export const GameBanner = ({ bannerUrl, title, adsCount }: GameBannerProps) => {
  return (
    <a
      href='javascript:void(0)'
      className='relative rounded-lg overflow-hidden keen-slider__slide number-slide1'
    >
      <img
        className='pointer-events-none max-h-[15rem] m-auto'
        src={bannerUrl}
        alt={`Imagem do jogo ${title}`}
      />
      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 bottom-0 right-0'>
        <strong className='font-bold text-center text-white block'>
          {title}
        </strong>
        <span className='text-zinc-300 text-center text-sm block'>
          {adsCount} {adsCount > 1 ? 'anúncios' : 'anúncio'}
        </span>
      </div>
    </a>
  );
};
