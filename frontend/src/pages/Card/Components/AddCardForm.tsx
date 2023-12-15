import { useContext, useRef, useState } from 'react';
import { Form, ActionButton, FormError, TextAreaInput, TextInput } from '../../../components/form';
import { Label, SelectOption } from '../../../types';
import LabelsSelect from './LabelsSelect';
import mapToSelectOptions from '../../../utils/mapToSelectOptions';
import { dbContext } from '../../../context/DatabaseContext';

interface AddCardFormProps {
  deckName: string;
  deckId: string;
  labels: Label[];
  onSubmitForm: () => void;
}

function AddCardForm({ deckName, deckId, labels, onSubmitForm }: AddCardFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const selectLabels = mapToSelectOptions(labels);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  let selectedLabels: string[] = [];
  const db = useContext(dbContext);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const content = contentInputRef.current?.value;
    const cardLabels = db.label.getLabels().filter((l) => selectedLabels.some((e) => e === l.id));

    const card = {
      id: crypto.randomUUID(),
      name: name!,
      content: content!,
      deckId,
      labels: cardLabels,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    db.card.createCard(card);
    onSubmitForm();
  };

  const handleSelectOnChange = (option: readonly SelectOption[] | SelectOption | null) => {
    selectedLabels = [...(option as SelectOption[]).map((o) => o.value)];
  };

  return (
    <Form onSubmit={submitHandler} onBlur={() => setFormError(undefined)}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '0', padding: '0' }}>
        <div>
          <TextInput label="Title" name="card-name" type="text" ref={nameInputRef} maxLength={25} required autoFocus />
        </div>
        <div>
          <TextInput label="Deck" name="deck-name" type="text" value={deckName} readOnly />
        </div>
      </div>
      <TextAreaInput label="Text" name="card-content" ref={contentInputRef} rows={4} cols={60} required />
      <LabelsSelect options={selectLabels} onChange={handleSelectOnChange} defaultValue={[]} />
      {formError && <FormError>{formError}</FormError>}
      <ActionButton style={{ margin: '25px 0 15px' }} type="submit">
        Add Card
      </ActionButton>
    </Form>
  );
}

export default AddCardForm;
