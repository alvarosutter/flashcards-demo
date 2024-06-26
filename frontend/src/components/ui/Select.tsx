import type { GroupBase, StylesConfig } from 'react-select';
import Select from 'react-select';
import styled, { useTheme } from 'styled-components';

import type { SelectOption, ISelectProps } from '../../types';

const Label = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
  background: none;
  padding: 0;
  margin: 0;
  font-size: 1em;
  font-family: ${({ theme }) => theme.fonts.btnFont}, sans-serif;
  font-weight: 300;
  user-select: none;
`;

const formatOptionLabel = ({ label }: SelectOption) => <Label>{label}</Label>;

function MySelectStyle() {
  const theme = useTheme();

  const style: StylesConfig<SelectOption> = {
    control: (provided, state) => ({
      ...provided,
      background: theme.colors.button,
      border: 'none',
      width: '107px',
      height: 'fit-content',
      padding: '0px',
      margin: '0px',
      cursor: 'pointer',
      boxShadow: state.isFocused ? `0 0 0 1px ${theme.colors.buttonDarker}` : 'none',
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
    }),

    menu: (provided) => ({
      ...provided,
      minWidth: 'fit-content',
      background: theme.colors.buttonDarker,
      boxShadow: `0 0 0 1px ${theme.colors.buttonDarker}`,
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
      cursor: 'pointer',
      borderRadius: '5px',
    }),

    option: (provided) => ({
      ...provided,
      minWidth: 'fit-content',
      background: theme.colors.buttonDarker,
      '&:hover': {
        background: theme.colors.button,
        borderTop: `1px solid ${theme.colors.accent}`,
        borderBottom: `1px solid ${theme.colors.accent}`,
      },
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
      cursor: 'pointer',
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: theme.colors.primaryText,
    }),

    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
  };

  return style;
}

interface IMySelectProps extends ISelectProps {
  style?: StylesConfig<SelectOption, boolean, GroupBase<SelectOption>>;
  name: string;
  isMulti: boolean;
  isSearchable: boolean;
  isClearable: boolean;
  isDisabled: boolean;
}

function MySelect({
  style = MySelectStyle(),
  options,
  defaultValue,
  name,
  isMulti,
  isSearchable,
  isClearable,
  isDisabled,
  onChange,
}: IMySelectProps) {
  return (
    <Select
      styles={style}
      formatOptionLabel={formatOptionLabel}
      options={options}
      defaultValue={defaultValue}
      name={name}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={isDisabled}
      onChange={onChange}
    />
  );
}

export default MySelect;
