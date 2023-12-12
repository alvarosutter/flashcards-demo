import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Deck } from '../../../types';
import { deleteDeck } from '../../../services/FlashcardsApi/deck.services';
import { DeleteForm } from '../../../components/form';

interface DeleteDeckFormProps {
  deck: Deck;
  onSubmitForm: () => void;
  onCancel: () => void;
}

function DeleteDeckForm({ deck, onSubmitForm, onCancel }: DeleteDeckFormProps) {
  const [formError, setFormError] = useState<undefined | string>();

  const queryClient = useQueryClient();
  const { mutateAsync: deleteDeckMutation } = useMutation({
    mutationFn: deleteDeck,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['decks'], exact: true });
      await queryClient.invalidateQueries({ queryKey: ['label-cards'] });
      await queryClient.invalidateQueries({ queryKey: ['labels'], exact: true });
    },
  });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await deleteDeckMutation(deck.id);
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
