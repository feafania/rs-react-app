import { Component } from 'react';

interface SearchButtonProps {
  onClick: () => void;
}

export class SearchButton extends Component<SearchButtonProps> {
  render() {
    return (
      <button className="search-button" onClick={this.props.onClick}>
        Search
      </button>
    );
  }
}
