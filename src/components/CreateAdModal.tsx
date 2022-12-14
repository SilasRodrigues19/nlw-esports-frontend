import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';
import { Input } from './Form/Input';
import { useEffect, useState, FormEvent } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

import { Formik, Form } from 'formik';
import * as val from 'yup';

const modalSchema = val.object().shape({
  name: val.string().required('Informe seu nickname'),
  yearsPlaying: val.number().required('Informe seu tempo de jogo'),
  discord: val.string().required('Informe seu usuário no Discord'),
  weekDays: val.array().required('Marque os dias que costuma jogar'),
  useVoiceChannel: val.boolean(),
});

/* type Props = val.InferType<typeof modalSchema> */

interface Props {
  name: string;
  yearsPlaying: number | undefined;
  discord: string;
  weekDays: [];
  useVoiceChannel: boolean;
}


const initialValues: Props = {
  name: '',
  yearsPlaying: undefined,
  discord: '',
  weekDays: [],
  useVoiceChannel: false,
};

interface Game {
  id: string;
  title: string;
}

export const CreateAdModal = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekdays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios('http://localhost:3333/games').then((res) => {
      setGames(res.data);
    });
  }, []);

  const handleCreateAd = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      toast.success('Anúncio criado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar anúncio!');
    }
  };

  return (
    <Dialog.Portal>
      <ToastContainer />
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 z-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/25 sm:w-[20rem] md:w-[30rem] :h-full overflow-auto max-h-[90vh]'>
        <Dialog.Title className='sm:text-xl md:text-3xl font-black'>
          Publique um anúncio
        </Dialog.Title>

        <Formik
          onSubmit={async (values) => {
            handleCreateAd;
          }}
          validationSchema={modalSchema}
          initialValues={initialValues}
        >
          {({ errors }) => (
            <Form className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='game' className='sm:text-sm'>
                  Qual o game?
                </label>
                <select
                  id='game'
                  name='game'
                  className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
                >
                  <option
                    className='sm:text-sm text-zinc-500'
                    value=''
                    selected
                    disabled
                  >
                    Selecione o game que deseja jogar
                  </option>

                  {games.map(({ id, title }) => {
                    return (
                      <option key={id} value={id}>
                        {title}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='name'>Seu nome ou nickname</label>
                <Input
                  name='name'
                  id='name'
                  placeholder='Como te chamam dentro do game?'
                />
                {errors.name && (
                  <div className='text-red-500'>{errors.name}</div>
                )}
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='yearsPlaying'>Joga a quantos anos?</label>
                  <Input
                    type='number'
                    name='yearsPlaying'
                    id='yearsPlaying'
                    placeholder='Tudo bem ser ZERO'
                  />
                  {errors.name && (
                    <div className='text-red-500'>{errors.yearsPlaying}</div>
                  )}
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='discord'>Qual seu Discord?</label>
                  <Input
                    name='discord'
                    id='discord'
                    placeholder='Usuario#0000'
                  />
                  {errors.name && (
                    <div className='text-red-500'>{errors.discord}</div>
                  )}
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='weekDays'>Quando costuma jogar?</label>

                  <ToggleGroup.Root
                    type='multiple'
                    className='flex gap-2'
                    value={weekDays}
                    onValueChange={setWeekdays}
                  >
                    <ToggleGroup.Item
                      value='0'
                      title='Domingo'
                      className={`w-12 h-8 rounded ${
                        weekDays.includes('0')
                          ? 'bg-violet-500 scale-105 transition-transform'
                          : 'bg-zinc-900'
                      }`}
                    >
                      Dom
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value='1'
                      title='Segunda'
                      className={`w-12 h-8 rounded ${
                        weekDays.includes('1')
                          ? 'bg-violet-500 scale-105 transition-transform'
                          : 'bg-zinc-900'
                      }`}
                    >
                      Seg
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value='2'
                      title='Terça'
                      className={`w-12 h-8 rounded ${
                        weekDays.includes('2')
                          ? 'bg-violet-500 scale-105 transition-transform'
                          : 'bg-zinc-900'
                      }`}
                    >
                      Ter
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value='3'
                      title='Quarta'
                      className={`w-12 h-8 rounded ${
                        weekDays.includes('3')
                          ? 'bg-violet-500 scale-105 transition-transform'
                          : 'bg-zinc-900'
                      }`}
                    >
                      Qua
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value='4'
                      title='Quinta'
                      className={`w-12 h-8 rounded ${
                        weekDays.includes('4')
                          ? 'bg-violet-500 scale-105 transition-transform'
                          : 'bg-zinc-900'
                      }`}
                    >
                      Qui
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value='5'
                      title='Sexta'
                      className={`w-12 h-8 rounded ${
                        weekDays.includes('5')
                          ? 'bg-violet-500 scale-105 transition-transform'
                          : 'bg-zinc-900'
                      }`}
                    >
                      Sex
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value='6'
                      title='Sábado'
                      className={`w-12 h-8 rounded ${
                        weekDays.includes('6')
                          ? 'bg-violet-500 scale-105 transition-transform'
                          : 'bg-zinc-900'
                      }`}
                    >
                      Sáb
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                  {weekDays.length === 0 && (
                    <div className='text-red-500'>
                      Selecione pelo menos um dia
                    </div>
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='hourStart'>Qual o horário do dia?</label>
                <div className='grid grid-cols-2 gap-6'>
                  <Input
                    required
                    name='hourStart'
                    id='hourStart'
                    type='time'
                    placeholder='De'
                  />
                  <Input
                    required
                    name='hourEnd'
                    id='hourEnd'
                    type='time'
                    placeholder='Até'
                  />
                </div>
              </div>

              <label className='mt-2 flex items-center gap-2 text-sm cursor-pointer'>
                <Checkbox.Root
                  checked={useVoiceChannel}
                  onCheckedChange={(checked) => {
                    checked === true
                      ? setUseVoiceChannel(true)
                      : setUseVoiceChannel(false);
                  }}
                  className='w-6 h-6 p-1 rounded bg-zinc-900'
                >
                  <Checkbox.Indicator>
                    <Check className='w-4 h-4 text-emerald-400' />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close
                  type='button'
                  className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type='submit'
                  className='flex items-center gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600'
                >
                  <GameController size={22} />
                  Encontrar
                </button>
              </footer>
            </Form>
          )}
        </Formik>

        {/* <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
        </form> */}
      </Dialog.Content>
    </Dialog.Portal>
  );
};
