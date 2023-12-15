import { useState, useRef, useContext } from 'react';
import { Form, TextInput, CheckboxInput, FormError, ActionButton } from '../../../components/form';
import { dbContext } from '../../../context/DatabaseContext';

interface AddDeckFormProps {
  onSubmitForm: () => void;
}

function AddDeckForm({ onSubmitForm }: AddDeckFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const archivedInputRef = useRef<HTMLInputElement>(null);

  const db = useContext(dbContext);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const archived = archivedInputRef.current?.checked;

    const deck = {
      id: crypto.randomUUID(),
      name: name!,
      archived: archived!,
      createdAt: new Date(),
      updatedAt: new Date(),
      cards: [],
    };

    db.deck.createDeck(deck);
    onSubmitForm();
  };

  return (
    <>
      <Form
        id="addDeck"
        onSubmit={submitHandler}
        onBlur={() => setFormError(undefined)}
        style={{ flexDirection: 'row' }}
      >
        <TextInput label="Name" name="deck-name" ref={nameInputRef} type="text" maxLength={15} required autoFocus />
        <CheckboxInput label="Archived" name="deck-archived" ref={archivedInputRef} type="checkbox" />
        {formError && <FormError>{formError}</FormError>}
      </Form>
      <ActionButton form="addDeck" style={{ margin: '25px 0 15px' }} type="submit">
        Add Deck
      </ActionButton>
    </>
  );
}

export default AddDeckForm;
