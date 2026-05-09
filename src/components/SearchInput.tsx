import React, { type ChangeEvent, type KeyboardEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
}

export class SearchInput extends React.Component<SearchInputProps> {
  handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.onEnter();
    }
  };

  render() {
    const { value, onChange } = this.props;

    return (
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}
