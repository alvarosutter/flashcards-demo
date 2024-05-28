import { useContext, useState } from 'react';

import { DeleteForm } from '../../../components/form';
import { dbContext } from '../../../context/DatabaseContext';
import type { Deck } from '../../../types';

interface DeleteDeckFormProps {
  deck: Deck;
  onSubmitForm: () => void;
  onCancel: () => void;
}

function DeleteDeckForm({ deck, onSubmitForm, onCancel }: DeleteDeckFormProps) {
  const [formError, setFormError] = useState<undefined | string>();

  const db = useContext(dbContext);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    db.deck.deleteDeck(deck.id);
    onSubmitForm();
  };

  return (
    <DeleteForm
      onSubmit={submitHandler}
      onBlur={() => setFormError(undefined)}
      onCancel={onCancel}
      formError={formError}
      name={deck.name}
    />
  );
}

export default DeleteDeckForm;
