import { type ChangeEvent, Component } from 'react';

import { SearchInput } from './SearchInput';
import { SearchButton } from './SearchButton';

interface SearchSectionProps {
  onSearch: (searchTerm: string) => void;
  initialValue: string;
}

interface SearchSectionState {
  searchTerm: string;
}

export class SearchSection extends Component<
  SearchSectionProps,
  SearchSectionState
> {
  state: SearchSectionState = {
    searchTerm: this.props.initialValue || '',
  };

  componentDidMount(): void {
    const savedSearch = localStorage.getItem('searchTerm');

    if (savedSearch) {
      this.setState({
        searchTerm: savedSearch,
      });
    }
  }

  componentDidUpdate(prevProps: SearchSectionProps): void {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({
        searchTerm: this.props.initialValue,
      });
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;

    this.setState({
      searchTerm: value,
    });

    localStorage.setItem('searchTerm', value);
  };

  handleSearch = (): void => {
    this.props.onSearch(this.state.searchTerm);
  };

  render() {
    return (
      <section className="search-section">
        <div className="top-controls">
          <SearchInput
            value={this.state.searchTerm}
            onChange={this.handleChange}
            onEnter={this.handleSearch}
          />
          <SearchButton onClick={this.handleSearch} />{' '}
        </div>
      </section>
    );
  }
}
