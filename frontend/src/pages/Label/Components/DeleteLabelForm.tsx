import { useContext, useState } from 'react';

import { DeleteForm } from '../../../components/form';

import { Label } from '../../../types';
import { dbContext } from '../../../context/DatabaseContext';

interface DeleteLabelFormProps {
  label: Label;
  onSubmitForm: () => void;
  onCancel: () => void;
}

function DeleteLabelForm({ label, onSubmitForm, onCancel }: DeleteLabelFormProps) {
  const [formError, setFormError] = useState<undefined | string>();
  const db = useContext(dbContext);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    db.label.deleteLabel(label.id);
    onSubmitForm();
  };

  return (
    <DeleteForm
      onSubmit={submitHandler}
      onBlur={() => setFormError(undefined)}
      onCancel={onCancel}
      formError={formError}
      name={label.name}
    />
  );
}

export default DeleteLabelForm;
