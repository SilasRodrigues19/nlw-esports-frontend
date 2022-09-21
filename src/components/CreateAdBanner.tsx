import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

export const CreateAdBanner = () => {
  return (
    <div className='pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden'>
      <div className='bg-[#2a2634] px-8 py-6 flex justify-between items-center flex-wrap gap-4'>
        <div>
          <strong className=' text-white font-black block md:text-md sm:text-center sm:mx-1 md:text-2xl'>
            Não encontrou seu duo?
          </strong>
          <span className='text-zinc-400 block'>
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger className='flex items-center gap-2 py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded group hover:transition-all'>
          <MagnifyingGlassPlus size={20} className='group-hover:scale-110' />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
};
