import { useContext, useState } from 'react';

import AddLabelForm from './Components/AddLabelForm';
import DeleteLabelForm from './Components/DeleteLabelForm';
import EditLabelForm from './Components/EditLabelForm';
import LabelDashboardBar from './Components/LabelDashboardBar';
import LabelGallery from './Components/LabelGallery';
import { Modal } from '../../components/ui';
import { dbContext } from '../../context/DatabaseContext';
import { useLocalStorage } from '../../hooks';
import type { SortOption, FilterValue, Label, SelectOption } from '../../types';
import { sortDefaultOption, sortOptions } from '../../utils/sortOptions';
import Cards from '../Card/Cards';

function LabelPage() {
  const { value: sortValue, setValue: setSortValue } = useLocalStorage('label-sort', {
    ...sortDefaultOption,
  }) as SortOption;
  const { value: showEmpty, setValue: setShowEmpty } = useLocalStorage(
    'show-empty',
    true,
  ) as FilterValue;
  const [addLabelVisible, setAddLabelVisible] = useState(false);
  const [editLabel, setEditLabel] = useState<Label | null>(null);
  const [deleteLabel, setDeleteLabel] = useState<Label | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const db = useContext(dbContext);
  const labels = db.label.getLabels();

  function sortLabels(sortOption: SelectOption) {
    const option = sortOptions.filter((o) => o.value === sortOption?.value);
    labels.sort(option[0].func);
  }

  sortLabels(sortValue);

  if (selectedLabel) {
    return <Cards item={selectedLabel} goBack={() => setSelectedLabel(null)} />;
  }

  return (
    <>
      <LabelDashboardBar
        addItem={() => setAddLabelVisible(true)}
        options={sortOptions.map((option) => ({
          label: option.label,
          value: option.value,
        }))}
        defaultValue={sortValue}
        onChange={(option) => {
          setSortValue(option as SelectOption);
          sortLabels(option as SelectOption);
        }}
        value={showEmpty}
        onClick={(value) => setShowEmpty(value)}
      />
      <LabelGallery
        labels={showEmpty ? labels : labels.filter((label) => label.cards?.length !== 0)}
        setEditLabel={setEditLabel}
        setDeleteLabel={setDeleteLabel}
        setSelectedLabel={setSelectedLabel}
      />
      <Modal
        title="Add Label"
        isOpen={addLabelVisible}
        onCancel={() => {
          setAddLabelVisible(false);
        }}
      >
        <AddLabelForm
          onSubmitForm={() => {
            setAddLabelVisible(false);
          }}
        />
      </Modal>
      <Modal
        title="Edit Label"
        isOpen={!!editLabel}
        onCancel={() => {
          setEditLabel(null);
        }}
      >
        <EditLabelForm
          onSubmitForm={() => {
            setEditLabel(null);
          }}
          label={editLabel!}
          onCancel={() => {
            setEditLabel(null);
          }}
        />
      </Modal>
      <Modal
        title="Delete Label"
        isOpen={!!deleteLabel}
        onCancel={() => {
          setDeleteLabel(null);
        }}
      >
        <DeleteLabelForm
          onSubmitForm={() => {
            setDeleteLabel(null);
          }}
          label={deleteLabel!}
          onCancel={() => {
            setDeleteLabel(null);
          }}
        />
      </Modal>
    </>
  );
}

export default LabelPage;
