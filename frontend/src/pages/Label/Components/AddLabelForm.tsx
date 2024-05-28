import { useContext, useRef, useState } from 'react';

import { Form, ActionButton, FormError, TextInput } from '../../../components/form';
import { dbContext } from '../../../context/DatabaseContext';

interface AddLabelFormProps {
  onSubmitForm: () => void;
}

function AddLabelForm({ onSubmitForm }: AddLabelFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const db = useContext(dbContext);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;

    const label = {
      id: crypto.randomUUID(),
      name: name!,
      createdAt: new Date(),
      updatedAt: new Date(),
      cards: [],
    };

    db.label.createLabel(label);
    onSubmitForm();
  };

  return (
    <Form onSubmit={submitHandler} onBlur={() => setFormError(undefined)}>
      <TextInput
        label="Name"
        name="label-name"
        ref={nameInputRef}
        type="text"
        maxLength={15}
        required
        autoFocus
      />
      {formError && <FormError>{formError}</FormError>}
      <ActionButton style={{ margin: '25px 0 15px' }} type="submit">
        Add Label
      </ActionButton>
    </Form>
  );
}

export default AddLabelForm;
