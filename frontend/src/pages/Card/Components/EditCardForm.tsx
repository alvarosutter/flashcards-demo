import { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { Form, ActionButton, FormError, TextAreaInput, TextInput, CancelButton } from '../../../components/form';
import { Card, Deck, Label, SelectOption } from '../../../types';
import LabelsSelect from './LabelsSelect';
import mapToSelectOptions from '../../../utils/mapToSelectOptions';
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

interface EditCardFormProps {
  card: Card;
  onSubmitForm: () => void;
  labels: Label[];
  decks: Deck[];
  onCancel: () => void;
}

function EditCardForm({ card, onSubmitForm, labels, decks, onCancel }: EditCardFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const cardDeck = decks.find((deck) => deck.id === card.deckId)!;
  const selectLabels = mapToSelectOptions(labels);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  let selectedLabels: string[] = card.labels.map((label) => label.name);
  const db = useContext(dbContext);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const content = contentInputRef.current?.value;

    const cardLabels = db.actions.getLabels().filter((l) => selectedLabels.some((e) => e === l.id));

    const editedCard = {
      id: card.id,
      deckId: card.deckId,
      name: name!,
      content: content!,
      createdAt: card.createdAt,
      updatedAt: name !== card.name || content !== card.content ? new Date() : card.updatedAt,
      labels: cardLabels,
    };

    db.actions.editCard(editedCard);
    onSubmitForm();
  };

  const handleSelectOnChange = (option: readonly SelectOption[] | SelectOption | null) => {
    selectedLabels = [...(option as SelectOption[]).map((o) => o.value)];
  };

  return (
    <Form onSubmit={submitHandler} onBlur={() => setFormError(undefined)}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '0', padding: '0' }}>
        <div>
          <TextInput
            label="Title"
            name="card-name"
            type="text"
            ref={nameInputRef}
            maxLength={25}
            defaultValue={card.name}
            required
          />
        </div>
        <div>
          <TextInput label="Deck" name="deck-name" type="text" value={cardDeck.name} readOnly />
        </div>
      </div>
      <TextAreaInput
        label="Text"
        name="card-content"
        defaultValue={card.content}
        ref={contentInputRef}
        rows={4}
        cols={60}
        required
      />
      <LabelsSelect
        options={selectLabels}
        onChange={handleSelectOnChange}
        defaultValue={mapToSelectOptions(card.labels)}
      />
      {formError && <FormError>{formError}</FormError>}
      <ButtonContainer>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <ActionButton type="submit">Edit Card</ActionButton>
      </ButtonContainer>
    </Form>
  );
}

export default EditCardForm;
