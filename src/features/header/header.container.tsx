import * as React from 'react';
import * as H from 'history';

import { connect } from 'react-redux';
import { Store } from '../../store/root';

import { HeaderComponent } from './header.component';

interface Props {
  counter: number;
}

export class HeaderContainer extends React.Component<Props> {

  history: H.History;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.history = H.createBrowserHistory();
  }

  render() {

    return (
      <HeaderComponent
        counter={this.props.counter}
        click={this.handleClick}
      />
    );
  }

  handleClick = () => {
    this.history.push('/basket');
  }
}

function mapStateToProps(state: Store) {
  return {
    counter: state.toyReducer.counter
  };
}

export default connect(
  mapStateToProps
)(HeaderContainer);
