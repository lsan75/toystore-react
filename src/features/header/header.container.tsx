import * as React from 'react';

import { connect } from 'react-redux';
import { Store } from '../../store/root';
import { HeaderComponent } from './header.component';
import { Action, Dispatch } from 'redux';
import { openAuthAction } from '../../store/auth/auth.action';

interface Props {
  counter: number;
  isConnected: boolean;
  isOpened: boolean;
  openAuth: () => Action;
}

export class HeaderContainer extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {

    return (
      <HeaderComponent
        counter={this.props.counter}
        isConnected={this.props.isConnected}
        isOpened={this.props.isOpened}
        click={this.handleClick}
      />
    );

  }

  handleClick = () => {
    this.props.openAuth();
  }

}

function mapStateToProps(state: Store) {
  return {
    counter: state.toyReducer.counter,
    isConnected: state.authReducer.isConnected,
    isOpened: state.authReducer.isOpened
  };
}

function mapDispatchToProps(dispatch: Dispatch<Props>) {
  return {
    openAuth: () => dispatch( openAuthAction() )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
