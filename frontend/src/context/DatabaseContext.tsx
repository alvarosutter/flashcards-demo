import { createContext } from 'react';
import { Card, Deck, Label } from '../types';
import { useLocalStorage } from '../hooks';

type DbContext = {
  actions: {
    getDecks: () => Deck[];
    addDeck: (deck: Deck) => void;
    editDeck: (deck: Deck) => void;
    deleteDeck: (id: string) => void;
    getDeckCards: (id: string) => Card[];

    getLabels: () => Label[];
    addLabel: (label: Label) => void;
    editLabel: (label: Label) => void;
    deleteLabel: (id: string) => void;
    getLabelCards: (id: string) => Card[];

    addCard: (card: Card) => void;
    editCard: (card: Card) => void;
    deleteCard: (card: Card) => void;
  };
};

const initialDbContext = {
  actions: {
    getDecks: () => [],
    addDeck: () => undefined,
    editDeck: () => undefined,
    deleteDeck: () => undefined,
    getDeckCards: () => [],

    getLabels: () => [],
    addLabel: () => undefined,
    editLabel: () => undefined,
    deleteLabel: () => undefined,
    getLabelCards: () => [],

    addCard: () => undefined,
    editCard: () => undefined,
    deleteCard: () => undefined,
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export const dbContext = createContext<DbContext>(initialDbContext);

interface DBProviderProps {
  children: React.ReactNode;
}
export function DBProvider({ children }: DBProviderProps) {
  const { value: decks, setValue: setDecks } = useLocalStorage('decks', []) as {
    value: Deck[];
    setValue: React.Dispatch<React.SetStateAction<Deck[]>>;
  };
  const { value: labels, setValue: setLabels } = useLocalStorage('labels', []) as {
    value: Label[];
    setValue: React.Dispatch<React.SetStateAction<Label[]>>;
  };
  const { value: cards, setValue: setCards } = useLocalStorage('cards', []) as {
    value: Card[];
    setValue: React.Dispatch<React.SetStateAction<Card[]>>;
  };

  const getDecks = () => {
    return decks;
  };

  const addDeck = (deck: Deck) => {
    decks.push(deck);
    setDecks([...decks]);
  };

  const editDeck = (deck: Deck) => {
    const decksList = decks;
    const index = decksList.findIndex((d) => d.id === deck.id);
    if (index !== -1) decksList.splice(index, 1, deck);

    setDecks([...decksList]);
  };

  const deleteDeck = (id: string) => {
    const decksList = decks;
    const index = decksList.findIndex((d) => d.id === id);
    if (index !== -1) decksList.splice(index, 1);

    setCards([...cards.filter((c) => c.deckId === id)]);
    setDecks([...decksList]);
  };

  const getDeckCards = (deckId: string) => {
    const decksList = decks;
    const deck = decksList.find((d) => d.id === deckId);

    return deck!.cards;
  };

  const getLabels = () => {
    return labels;
  };

  const addLabel = (label: Label) => {
    labels.push(label);
    setLabels([...labels]);
  };

  const editLabel = (label: Label) => {
    const labelsList = labels;
    const index = labelsList.findIndex((d) => d.id === label.id);
    if (index !== -1) labelsList.splice(index, 1, label);

    setLabels([...labelsList]);
  };

  const deleteLabel = (labelId: string) => {
    const labelsList = labels;
    const index = labelsList.findIndex((l) => l.id === labelId);
    if (index !== -1) labelsList.splice(index, 1);

    setLabels([...labelsList]);

    const cardsList = cards;
    const labelCards = cardsList.filter((c) => c.labels.some((e) => e.id === labelId));
    cardsList.forEach((card) => {
      if (labelCards.includes(card)) {
        const newCard = card;
        const cardLabels = card.labels;
        const i = cardLabels.findIndex((l) => l.id === labelId);
        if (i !== -1) cardLabels.splice(i, 1);
        newCard.labels = cardLabels;

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        editCard(newCard);
      }
    });
  };

  const getLabelCards = (labelId: string) => {
    const cardsList = cards;
    const labelCards = cardsList.filter((c) => c.labels.some((e) => e.id === labelId));

    return labelCards;
  };

  const addCard = (card: Card) => {
    const decksList = decks;
    const cardsList = cards;

    cardsList.push(card);

    const deck = decksList.find((d) => d.id === card.deckId)!;
    const index = decksList.findIndex((d) => d.id === card.deckId);
    const deckCards = deck.cards;
    deckCards.push(card);
    deck.cards = deckCards;

    if (index !== -1) decksList.splice(index, 1, deck);

    setDecks([...decksList]);
    setCards([...cardsList]);
  };

  const editCard = (editedCard: Card) => {
    const decksList = decks;
    const cardsList = cards;

    const deck = decksList.find((d) => d.id === editedCard.deckId)!;
    const deckIndex = decksList.findIndex((d) => d.id === editedCard.deckId);

    if (deckIndex !== -1) {
      const deckCards = deck.cards;

      const cIndex = deckCards.findIndex((c) => c.id === editedCard.id);
      if (cIndex !== -1) deckCards.splice(cIndex, 1, editedCard);
      deck.cards = deckCards;
      decksList.splice(deckIndex, 1, deck);
    }

    const cardIndex = cardsList.findIndex((c) => c.id === editedCard.id);
    if (cardIndex !== -1) {
      cardsList.splice(cardIndex, 1, editedCard);
    }

    setDecks([...decksList]);
    setCards([...cardsList]);
  };

  const deleteCard = (card: Card) => {
    const decksList = decks;
    const cardsList = cards;

    const deck = decksList.find((d) => d.id === card.deckId)!;
    const deckIndex = decksList.findIndex((d) => d.id === card.deckId);

    if (deckIndex !== -1) {
      const deckCards = deck.cards;

      const cIndex = deckCards.findIndex((c) => c.id === card.id);
      if (cIndex !== -1) deckCards.splice(cIndex, 1);
      deck.cards = deckCards;
      decksList.splice(deckIndex, 1, deck);
    }

    const cardIndex = cardsList.findIndex((c) => c.id === card.id);
    if (cardIndex !== -1) {
      cardsList.splice(cardIndex, 1);
    }

    setDecks([...decksList]);
    setCards([...cardsList]);
  };

  return (
    <dbContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        actions: {
          getDecks,
          addDeck,
          editDeck,
          deleteDeck,
          getDeckCards,

          getLabels,
          addLabel,
          editLabel,
          deleteLabel,
          getLabelCards,

          addCard,
          editCard,
          deleteCard,
        },
      }}
    >
      {children}
    </dbContext.Provider>
  );
}
