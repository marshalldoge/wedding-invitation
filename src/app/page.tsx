'use client';
import Banner from '@/components/banner/Banner';
import Title from '@/components/common/Title';
import Invitation from '@/components/Invitation/Invitation';
import { useSearchParams } from 'next/navigation';
import Confirm from '@/components/confirm/Confirm';
import { getGuest } from '@/api/guestApi';
import FAQ from '@/components/faq/FAQ';
import FlowerCanvas from '@/components/canvas/FlowerCanvas';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
import Map from '@/components/map/Map';
const GlitchyText = dynamic(
  () => import('@/components/animated/GlitchyText'),
  { ssr: false }
);

interface Guest {
  id: string;
  name: string;
  table: string;
  gender: string;
}

const guestFetcher = async (id:string) => {
  const guest = await getGuest({ id });
  return guest;
};

export default function Home() {
  const searchParams = useSearchParams();
  const { data: guest, isLoading, mutate, isValidating } = useSWR(searchParams.get('id'), guestFetcher, {
    fallback: [],
    refreshInterval: 60000
  });

  return (
    <main className={'relative'}>
      <Banner title={'Boda'}>
        <Title className={'text-4xl md:text-5xl tracking-[0.5rem] vertical-text text-center'} >
          <GlitchyText text={'Maximilian'} speed={'fast'}/>
        </Title>
        <Title className={'text-6xl lg:text-6xl vertical-text text-center'} >
          <GlitchyText text={'&'} speed={'slow'} type={'kanji'}/>
        </Title>
        <Title className={'text-4xl md:text-5xl tracking-[1rem] vertical-text text-center'}>
          <GlitchyText text={'Carla'}/>
        </Title>
      </Banner>
      <Map/>
      {guest ? <Invitation>
        <h5 className={'pb-4 text-center'}>{guest.gender === 'M' ? 'Querido' : 'Querida'} {guest.name}:</h5>
        <div className={'text-center'}>
          <p className={'pb-2'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet, erat sit amet varius vulputate,
            massa mi venenatis neque, et biNam sagittis nibh nibh, et ultricies nisl tempor id. Curabitur pretium
            augue quis metus luctus tincidunt.</p>
          <p className={'pb-2'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet, erat sit amet varius vulputate,
            massa mi venenatis neque, et biNam sagittis nibh nibh, et ultricies nisl tempor id. Curabitur pretium
            augue quis metus luctus tincidunt.
          </p>
          <p className={'pb-2'}>
            Nunc mollis nibh risus, vitae finibus velit mattis id. Donec sem diam, blandit commodo ornare blandit,
            facilisis quis ex. Donec ut posuere ante, id ullamcorper augue. Maecenas non ultricies nisi. Vestibulum ac
            nisi in dui elementum congue vel nec lorem. Aenean ut ipsum vitae metus lobortis semper a cursus erat. Donec
            hendrerit p</p>
        </div>
      </Invitation> : <h3>Loading...</h3>}
      <Confirm guest={guest} reloadGuest={mutate} setLocalGuest={mutate}/>
      <FAQ/>
      <FlowerCanvas></FlowerCanvas>
    </main>
  );
}
