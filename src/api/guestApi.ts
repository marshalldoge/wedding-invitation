import { Guest } from '@/types/general';

export const updateGuest = async (guest: Guest) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/guests/update`;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(guest),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
    },
  });
  return res.json();
};

export const getGuest = async (guest: Guest) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/guests/find`;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(guest),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
    },
  });
  return res.json();
};

export const getAllGuest = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/guests/findAll`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
    },
  });
  return res.json();
};
