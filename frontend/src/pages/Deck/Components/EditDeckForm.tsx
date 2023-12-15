import { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { ActionButton, CancelButton, CheckboxInput, Form, FormError, TextInput } from '../../../components/form';
import { Deck } from '../../../types';
import { dbContext } from '../../../context/DatabaseContext';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 25px 0 15px;
  padding: 0;
`;

interface EditDeckFormProps {
  deck: Deck;
  onSubmitForm: () => void;
  onCancel: () => void;
}

function EditDeckForm({ deck, onSubmitForm, onCancel }: EditDeckFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const archivedInputRef = useRef<HTMLInputElement>(null);
  const db = useContext(dbContext);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const archived = archivedInputRef.current?.checked;

    const editedDeck = {
      id: deck.id,
      name: name!,
      archived: archived!,
      createdAt: deck.createdAt,
      updatedAt: name !== deck.name || archived !== deck.archived ? new Date() : deck.updatedAt,
      cards: deck.cards,
    };

    db.deck.patchDeck(editedDeck);
    onSubmitForm();
  };

  return (
    <>
      <Form
        id="editDeck"
        onSubmit={submitHandler}
        onBlur={() => setFormError(undefined)}
        style={{
          flexDirection: 'row',
        }}
      >
        <TextInput
          label="Name"
          name="deck-name"
          ref={nameInputRef}
          type="text"
          maxLength={15}
          defaultValue={deck.name}
          required
        />
        <CheckboxInput
          label="Archived"
          name="deck-archived"
          ref={archivedInputRef}
          type="checkbox"
          defaultChecked={deck.archived}
        />
        {formError && <FormError>{formError}</FormError>}
      </Form>
      <ButtonContainer>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <ActionButton form="editDeck" type="submit">
          Edit Deck
        </ActionButton>
      </ButtonContainer>
    </>
  );
}

export default EditDeckForm;
