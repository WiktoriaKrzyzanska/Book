import React, { JSX } from 'react';
import { MessageCircle, Wine, Armchair, Coffee, BookOpen } from 'lucide-react';
import { BookData, CursorVariant } from './bookTypes';

export const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

export const CURRENT_BOOK_ISBN = '9780061120084';

export const BOOK_FALLBACK: BookData = {
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  color: '#3b3a3a',
  description: 'Klasyczna opowieść o dorastaniu w miasteczku na amerykańskim Południu, gdzie dzieci obserwują proces sądowy swojego ojca, prawnika broniącego niesłusznie oskarżonego mężczyzny.',
  coverUrl: ''
};

export type VibeCard = {
  id: number;
  title: string;
  desc: string;
  icon: JSX.Element;
  cursorType: CursorVariant;
};

export const cards: VibeCard[] = [
  {
    id: 1,
    title: 'Lorem ipsum',
    desc: 'Zapomnij o akademickich analizach. Nie oceniamy, czy zrozumiałeś metaforę.',
    icon: <MessageCircle size={40} />,
    cursorType: 'book',
  },
  {
    id: 2,
    title: 'Twój Wybór',
    desc: 'Kawa, wino, herbata czy woda? Nie narzucamy menu.',
    icon: <Wine size={40} />,
    cursorType: 'wine',
  },
  {
    id: 3,
    title: 'Kameralnie',
    desc: 'Jakość rozmowy > ilość uczestników.',
    icon: <Armchair size={40} />,
    cursorType: 'book',
  },
  {
    id: 4,
    title: 'Cykliczność',
    desc: 'Widzimy się raz w miesiącu.',
    icon: <Coffee size={40} />,
    cursorType: 'wine',
  },
  {
    id: 5,
    title: 'Otwartość',
    desc: 'Każdy gatunek ma u nas miejsce.',
    icon: <BookOpen size={40} />,
    cursorType: 'book',
  },
];
