import { useContext, useState } from 'react';
import { Deck } from '../../../types';
import { DeleteForm } from '../../../components/form';
import { dbContext } from '../../../context/DatabaseContext';

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

    db.actions.deleteDeck(deck.id);
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
