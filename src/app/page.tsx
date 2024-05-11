import Banner from "@/components/banner/Banner";
import Title from "@/components/common/Title";

export default function Home() {
  return (
    <main>
      <Banner>
        <Title title={'Boda'} color={'text-purple-100 pb-5 text-h1'} />
        <Title title={'Maximilian V. y Carla M.'} color={'text-purple-100 pb-5 text-h2'} />
      </Banner>
    </main>
  );
}
