'use client';
import Banner from '@/components/banner/Banner';
import Title from '@/components/common/Title';
import Invitation from '@/components/Invitation/Invitation';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Confirm from '@/components/confirm/Confirm';
import { getGuest } from '@/api/guestApi';
import FAQ from '@/components/faq/FAQ';
import FlowerCanvas from '@/components/canvas/FlowerCanvas';

interface Guest {
  id: string;
  name: string;
  table: string;
  gender: string;
}

const props = {
  name: 'Michi',
  table: 'Fire'
};
export default function Home() {
  const searchParams = useSearchParams();
  const [guest, setGuest] = useState(null as unknown as Guest);

  const loadGuest = useCallback( async (): Promise<void> => {
    const guestId = searchParams.get('id') as string;
    getGuest({ id: guestId }).then((res) => {
      setGuest(res);
    });
  }, [searchParams.get('id')]);

  useEffect(() => {
    loadGuest();
  }, []);
  return (
    <main className={'relative'}>
      <Banner>
        <Title color={'text-purple-100 pb-5'} >
          <h1>Boda</h1>
        </Title>
        <Title color={'text-purple-100 pb-5'} >
          <h2>Maximilian V.</h2>
        </Title>
        <Title color={'text-purple-100 pb-5'} >
          <h2>Carla M.</h2>
        </Title>
      </Banner>
      {guest ? <Invitation>
        <h5 className={'pb-4'}>{guest.gender === 'M' ? 'Querido' : 'Querida'} {guest.name}:</h5>
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
      <Confirm guest={guest} reloadGuest={loadGuest} setLocalGuest={setGuest}/>
      <FAQ/>
      <FlowerCanvas></FlowerCanvas>
    </main>
  );
}
