import { Component } from 'react';
import { type Character } from '../types/types.ts';

interface ResultRowProps {
  character: Character;
}

export class ResultRow extends Component<ResultRowProps> {
  render() {
    const { name, gender, height, birth_year } = this.props.character;

    return (
      <div className="result-row">
        <span className="result-name">{name}</span>

        <span className="result-description">
          Gender: {gender} | Height: {height} | Birth year: {birth_year}
        </span>
      </div>
    );
  }
}
