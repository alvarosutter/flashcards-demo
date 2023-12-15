import { Card, Deck, Label } from '../types';

export type LabelsOnCard = {
  card: Card;
  label: Label;
  cardId: string;
  labelId: string;
};

export type CardsInDeck = {
  card: Card;
  deck: Deck;
  cardId: string;
  deckId: string;
};

const date = new Date();
export const cardData: Card = {
  id: '9dbaccb9-cab7-4846-9122-d005fd53755c',
  createdAt: date,
  updatedAt: date,
  name: 'test',
  content: 'this is my first card',
  deckId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
  labels: [],
};

export const labelData: Label = {
  id: '5d332513-6d80-4457-b799-bd1cbcf68f25',
  createdAt: date,
  updatedAt: date,
  name: 'myLabel',
  cards: [cardData],
};

export const deckData: Deck = {
  id: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
  createdAt: date,
  updatedAt: date,
  name: 'demo deck',
  archived: false,
  cards: [cardData],
};

export const labelsOnCardData: LabelsOnCard = {
  label: labelData,
  labelId: labelData.id,
  card: {
    ...cardData,
    labels: [labelData],
  },
  cardId: cardData.id,
};

export const cardsInDeckData: CardsInDeck = {
  deck: deckData,
  deckId: deckData.id,
  card: {
    ...cardData,
    labels: [labelData],
  },
  cardId: cardData.id,
};
