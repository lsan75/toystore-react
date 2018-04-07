import * as React from 'react';

import { connect } from 'react-redux';
import { Store } from '../../store/root';
import { HeaderComponent } from './header.component';
import { Action } from 'redux';
import { Dispatch } from 'redux';
import { openAuthAction } from '../../store/auth/auth.action';

interface Props {
  counter: number;
  isConnected: boolean;
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
    isConnected: state.authReducer.isConnected
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
