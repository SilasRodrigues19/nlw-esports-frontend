interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export const GameBanner = (props: GameBannerProps) => {
  return (
    <a
      href='javascript:void(0)'
      className='relative rounded-lg overflow-hidden'
    >
      <img
        className='pointer-events-none max-h-[15rem] m-auto object-fill'
        src={props.bannerUrl}
        alt=''
      />
      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 bottom-0 right-0'>
        <strong className='font-bold text-center text-white block'>
          {props.title}
        </strong>
        <span className='text-zinc-300 text-center text-sm block'>
          {props.adsCount} {props.adsCount > 1 ? 'anúncios' : 'anúncio'}
        </span>
      </div>
    </a>
  );
};
