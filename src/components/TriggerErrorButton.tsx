import { Component } from 'react';

interface TriggerErrorButtonProps {
  onClick: () => void;
}

export class TriggerErrorButton extends Component<TriggerErrorButtonProps> {
  render() {
    return (
      <button className="error-button" onClick={this.props.onClick}>
        Trigger Error
      </button>
    );
  }
}
