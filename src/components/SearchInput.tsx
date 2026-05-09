import React, { type ChangeEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export class SearchInput extends React.Component<SearchInputProps> {
  render() {
    const { value, onChange } = this.props;

    return (
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
    );
  }
}
