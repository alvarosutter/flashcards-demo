import { createContext } from 'react';

import type { CardsInDeck, LabelsOnCard } from './database.helpers';
import { cardsInDeckData, deckData, labelData, labelsOnCardData } from './database.helpers';
import { useLocalStorage } from '../hooks';
import type { Card, Deck, Label } from '../types';

type DbContext = {
  deck: {
    getDecks: () => Array<Deck>;
    createDeck: (deck: Deck) => void;
    patchDeck: (deck: Deck) => void;
    deleteDeck: (id: string) => void;
  };
  label: {
    getLabels: () => Array<Label>;
    createLabel: (label: Label) => void;
    patchLabel: (label: Label) => void;
    deleteLabel: (id: string) => void;
  };
  card: {
    getCards: (type: string, id: string) => Array<Card>;
    createCard: (card: Card) => void;
    patchCard: (card: Card) => void;
    deleteCard: (card: Card) => void;
  };
};

const initialDbContext = {
  deck: {
    getDecks: () => [],
    createDeck: () => undefined,
    patchDeck: () => undefined,
    deleteDeck: () => undefined,
  },
  label: {
    getLabels: () => [],
    createLabel: () => undefined,
    patchLabel: () => undefined,
    deleteLabel: () => undefined,
  },
  card: {
    getCards: () => [],
    createCard: () => undefined,
    patchCard: () => undefined,
    deleteCard: () => undefined,
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export const dbContext = createContext<DbContext>(initialDbContext);

interface DBProviderProps {
  children: React.ReactNode;
}
export function DBProvider({ children }: DBProviderProps) {
  const { value: decks, setValue: setDecks } = useLocalStorage('decks', [deckData]) as {
    value: Array<Deck>;
    setValue: React.Dispatch<React.SetStateAction<Array<Deck>>>;
  };
  const { value: labels, setValue: setLabels } = useLocalStorage('labels', [labelData]) as {
    value: Array<Label>;
    setValue: React.Dispatch<React.SetStateAction<Array<Label>>>;
  };
  const { value: labelsOnCard, setValue: setLabelsOnCard } = useLocalStorage('labelsOnCard', [
    labelsOnCardData,
  ]) as {
    value: Array<LabelsOnCard>;
    setValue: React.Dispatch<React.SetStateAction<Array<LabelsOnCard>>>;
  };
  const { value: cardsInDeck, setValue: setCardsInDeck } = useLocalStorage('cardsInDeck', [
    cardsInDeckData,
  ]) as {
    value: Array<CardsInDeck>;
    setValue: React.Dispatch<React.SetStateAction<Array<CardsInDeck>>>;
  };

  const getCards = (type: string, id: string) => {
    if (type === 'deck') {
      return cardsInDeck.filter((e) => e.deckId === id).map((i) => i.card);
    }
    return labelsOnCard.filter((e) => e.labelId === id).map((i) => i.card);
  };

  const getLabels = () => labels.map((label) => ({ ...label, cards: getCards('label', label.id) }));

  const getDecks = () => decks.map((deck) => ({ ...deck, cards: getCards('deck', deck.id) }));

  const createDeck = (deck: Deck) => {
    setDecks([...decks, deck]);
  };

  const patchDeck = (deck: Deck) => {
    const unaffectedDecks: Array<CardsInDeck> = cardsInDeck.filter((i) => i.deckId !== deck.id);
    const affectedDecks: Array<CardsInDeck> = cardsInDeck
      .filter((i) => i.deckId === deck.id)
      .map((e) => ({
        ...e,
        deck,
      }));

    setCardsInDeck([...unaffectedDecks, ...affectedDecks]);
    setDecks([...decks.filter((d) => d.id !== deck.id), deck]);
  };

  const deleteDeck = (id: string) => {
    setLabelsOnCard([...labelsOnCard.filter((i) => i.card.deckId !== id)]);
    setLabels([...getLabels()]);
    setCardsInDeck([...cardsInDeck.filter((i) => i.deckId !== id)]);
    setDecks([...decks.filter((d) => d.id !== id)]);
  };

  const createLabel = (label: Label) => {
    setLabels([...labels, label]);
  };

  const patchLabel = (label: Label) => {
    const cardsToEditIdList: Array<string> = labelsOnCard
      .filter((i) => i.labelId === label.id)
      .map((e) => e.card)
      .map((c) => c.id);

    const unaffectedLabels: Array<LabelsOnCard> = labelsOnCard.filter(
      (i) => i.labelId !== label.id,
    );
    const affectedLabels: Array<LabelsOnCard> = labelsOnCard
      .filter((i) => i.labelId === label.id)
      .map((e) => ({
        ...e,
        label,
      }));
    const labelOnCardList = [...unaffectedLabels, ...affectedLabels];
    setLabelsOnCard([...labelOnCardList]);
    setLabels([...labels.filter((l) => l.id !== label.id), label]);

    const unaffectedCards = cardsInDeck.filter((i) => !cardsToEditIdList.includes(i.cardId));
    const affectedCards = cardsInDeck
      .filter((i) => cardsToEditIdList.includes(i.cardId))
      .map((e) => ({
        ...e,
        card: {
          ...e.card,
          labels: labelOnCardList.filter((i) => i.cardId === e.cardId).map((i) => i.label),
        },
      }));
    setCardsInDeck([...unaffectedCards, ...affectedCards]);
    setDecks([...getDecks()]);
  };

  const deleteLabel = (id: string) => {
    const cardsToEditIdList: Array<string> = labelsOnCard
      .filter((i) => i.labelId === id)
      .map((e) => e.card)
      .map((c) => c.id);
    const labelOnCardList = labelsOnCard.filter((i) => i.labelId !== id);
    setLabelsOnCard([...labelOnCardList]);
    setLabels([...labels.filter((l) => l.id !== id)]);

    const unaffectedCards = cardsInDeck.filter((i) => !cardsToEditIdList.includes(i.cardId));
    const affectedCards = cardsInDeck
      .filter((i) => cardsToEditIdList.includes(i.cardId))
      .map((e) => ({
        ...e,
        card: {
          ...e.card,
          labels: labelOnCardList.filter((i) => i.cardId === e.cardId).map((i) => i.label),
        },
      }));
    setCardsInDeck([...unaffectedCards, ...affectedCards]);
    setDecks([...getDecks()]);
  };

  const createCard = (card: Card) => {
    const labelsOnCardsList: Array<LabelsOnCard> = card.labels.map((l) => ({
      card,
      label: l,
      cardId: card.id,
      labelId: l.id,
    }));
    const cardsInDeckList: Array<CardsInDeck> = decks
      .filter((d) => d.id === card.deckId)
      .map((d) => ({
        card,
        deck: d,
        cardId: card.id,
        deckId: d.id,
      }));

    setLabelsOnCard([...labelsOnCard, ...labelsOnCardsList]);
    setCardsInDeck([...cardsInDeck, ...cardsInDeckList]);
    setLabels([...getLabels()]);
    setDecks([...getDecks()]);
  };

  const patchCard = (card: Card) => {
    const unaffectedLabelsOnCard: Array<LabelsOnCard> = labelsOnCard.filter(
      (i) => i.cardId !== card.id,
    );
    const newLabelsOnCard: Array<LabelsOnCard> = card.labels.map((l) => ({
      card,
      label: l,
      cardId: card.id,
      labelId: l.id,
    }));

    setLabelsOnCard([...unaffectedLabelsOnCard, ...newLabelsOnCard]);
    setLabels([...getLabels()]);

    const updatedCardsInDeck = cardsInDeck
      .filter((i) => i.cardId === card.id)
      .map((e) => ({
        ...e,
        card,
      }));
    const unaffectedCardsInDeck = cardsInDeck.filter((i) => i.cardId !== card.id);
    setCardsInDeck([...unaffectedCardsInDeck, ...updatedCardsInDeck]);
    setDecks([...getDecks()]);
  };

  const deleteCard = (card: Card) => {
    setLabelsOnCard([...labelsOnCard.filter((i) => i.cardId !== card.id)]);
    setLabels([...getLabels()]);
    setCardsInDeck([...cardsInDeck.filter((i) => i.cardId !== card.id)]);
    setDecks([...getDecks()]);
  };

  return (
    <dbContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        deck: {
          getDecks,
          createDeck,
          patchDeck,
          deleteDeck,
        },
        label: {
          getLabels,
          createLabel,
          patchLabel,
          deleteLabel,
        },
        card: {
          getCards,
          createCard,
          patchCard,
          deleteCard,
        },
      }}
    >
      {children}
    </dbContext.Provider>
  );
}
