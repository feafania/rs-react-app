import { Component } from 'react';
import { type Character } from '../types/types.ts';
import { getCharacterDescription } from '../util/getCharacterDescription.ts';

interface ResultRowProps {
  character: Character;
}

export class ResultRow extends Component<ResultRowProps> {
  render() {
    const { name } = this.props.character;
    const description = getCharacterDescription(this.props.character);

    return (
      <div className="result-row">
        <span className="result-name">{name}</span>

        <span className="result-description">{description}</span>
      </div>
    );
  }
}
