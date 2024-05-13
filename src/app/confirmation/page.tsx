'use client';
import GuestTable from '@/components/lists/GuestTable';
import { useState } from 'react';
import { getAllGuest, updateGuest } from '@/api/guestApi';
import { Guest } from '@/types/general';
import Title from '@/components/common/Title';
import useSWR from 'swr';

const guestFetcher = async () => {
  const guests = await getAllGuest();
  return guests;
};

const ConfirmationListPage = () => {

  const [guests, setGuests] = useState([] as Guest[]);
  const { data, isLoading, mutate, isValidating } = useSWR('/guests/findAll', guestFetcher, {
    fallback: [],
    refreshInterval: 3000
  });

  const onUpdateLocked = (guest: Guest) => {
    console.log('Update guest', guest);
    updateGuest(guest).then((res) => {
      const newData = [...data];
      for(let i in newData) {
        if(newData[i].id === guest.id) {
          newData[i].locked = guest.locked;
        }
      }
      mutate(newData);
    });
  };

  console.log('Data', data);
  return (
    <div className={'h-[100vh]'}>
      <Title>
        <h1 className={'text-center text-brown-300 pt-10'}>Lista de invitados</h1>
      </Title>
      <div className={'mx-5 md:mx-10 py-10'}>
        {isLoading ? <h1 className={'text-brown-300 text-center'}>Loading...</h1>:<GuestTable guests={data} onUpdatedLockedUser={onUpdateLocked} isValidating={isValidating}/>}
      </div>
    </div>
  );
};

export default ConfirmationListPage;
