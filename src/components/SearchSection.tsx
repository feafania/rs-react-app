import React, { type ChangeEvent, Component } from 'react';

import { SearchInput } from './SearchInput';
import { SearchButton } from './SearchButton';

interface SearchSectionProps {
  onSearch: (searchTerm: string) => void;
  onSearchInputChange: (value: string) => void;
  initialValue: string;
}

export class SearchSection extends Component<SearchSectionProps> {
  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.onSearchInputChange(event.target.value);
  };

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.onSearch(this.props.initialValue);
  };

  render() {
    return (
      <form className="search-section" onSubmit={this.handleSubmit}>
        <div className="top-controls">
          <SearchInput
            value={this.props.initialValue}
            onChange={this.handleChange}
          />

          <SearchButton />
        </div>
      </form>
    );
  }
}
