import Banner from '@/components/banner/Banner';
import Title from '@/components/common/Title';
import Invitation from '@/components/Invitation/Invitation';

const props = {
  name: 'Michi',
  table: 'Fire'
};
export default function Home() {
  return (
    <main>
      <Banner>
        <Title color={'text-purple-100 pb-5'} >
          <h1>Boda</h1>
        </Title>
        <Title color={'text-purple-100 pb-5'} >
          <h2>Maximilian V. y Carla M.</h2>
        </Title>
      </Banner>
      <Invitation>
        <h6>Querido {props.name}:</h6>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet, erat sit amet varius vulputate, massa mi venenatis neque, et bibendum est ex eget leo. Maecenas dapibus, diam vitae viverra dictum, velit metus suscipit neque, nec luctus neque dolor nec massa. Integer volutpat nisl justo, at euismod felis convallis a. Quisque semper felis. Quisque volutpat, quam nec tincidunt molestie, ipsum est lacinia justo, vitae ultricies diam mauris sed purus. Nam sagittis nibh nibh, et ultricies nisl tempor id. Curabitur pretium augue quis metus luctus tincidunt. Quisque ultrices auctor lacus ac molestie. Duis vestibulum molestie mollis. Integer condimentum eros fermentum, ullamcorper libero non, dapibus ante. Praesent ante lorem, imperdiet ut imperdiet mattis, elementum eu mi. Etiam molestie ac sem sit amet viverra. Praesent quis cursus neque. Donec vitae arcu porta, iaculis nunc nec, facilisis lacus.

          Nunc mollis nibh risus, vitae finibus velit mattis id. Donec sem diam, blandit commodo ornare blandit, facilisis quis ex. Donec ut posuere ante, id ullamcorper augue. Maecenas non ultricies nisi. Vestibulum ac nisi in dui elementum congue vel nec lorem. Aenean ut ipsum vitae metus lobortis semper a cursus erat. Donec hendrerit p</p>
      </Invitation>
    </main>
  );
}
