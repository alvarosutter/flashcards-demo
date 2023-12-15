import { useContext, useState } from 'react';
import { DeleteForm } from '../../../components/form';
import { Card } from '../../../types';
import { dbContext } from '../../../context/DatabaseContext';

interface DeleteCardFormProps {
  card: Card;
  onSubmitForm: () => void;
  onCancel: () => void;
}

function DeleteCardForm({ card, onSubmitForm, onCancel }: DeleteCardFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const db = useContext(dbContext);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    db.card.deleteCard(card);
    onSubmitForm();
  };

  return (
    <DeleteForm
      onSubmit={submitHandler}
      onBlur={() => setFormError(undefined)}
      onCancel={onCancel}
      formError={formError}
      name={card.name}
    />
  );
}

export default DeleteCardForm;
