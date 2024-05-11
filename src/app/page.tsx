import Banner from '@/components/banner/Banner';
import Title from '@/components/common/Title';
import Invitation from '@/components/Invitation/Invitation';

export default function Home() {
  return (
    <main>
      <Banner>
        <Title title={'Boda'} color={'text-purple-100 pb-5 text-h1'} />
        <Title title={'Maximilian V. y Carla M.'} color={'text-purple-100 pb-5 text-h2'} />
      </Banner>
      <Invitation>
        Invitation
      </Invitation>
    </main>
  );
}
