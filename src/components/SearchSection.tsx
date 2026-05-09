import { type ChangeEvent, Component } from 'react';
import { SearchInput } from './SearchInput';
import { SearchButton } from './SearchButton';

interface SearchSectionState {
  searchTerm: string;
}

export class SearchSection extends Component<object, SearchSectionState> {
  state: SearchSectionState = {
    searchTerm: '',
  };

  componentDidMount(): void {
    const savedSearch = localStorage.getItem('searchTerm');

    if (savedSearch) {
      this.setState({
        searchTerm: savedSearch,
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

  render() {
    return (
      <section className="search-section">
        <div className="top-controls">
          <SearchInput
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />

          <SearchButton />
        </div>
      </section>
    );
  }
}
