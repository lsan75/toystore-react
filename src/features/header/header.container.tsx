import * as React from 'react';

import { connect } from 'react-redux';
import { Store } from '../../store/root';
import { HeaderComponent } from './header.component';
import { Action, Dispatch } from 'redux';
import { openAuthAction, submitAuthAction } from '../../store/auth/auth.action';
import { UserState } from '../auth/auth.component';
import { AuthAction } from '../../store/auth/auth.reducer';

import * as history from 'history';

interface Props {
  counter: number;
  isConnected: boolean;
  isOpened: boolean;
  isError: boolean;
  openAuth: () => Action;
  submitAuth: (user: UserState) => AuthAction;
  history: history.History;
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
        isError={this.props.isError}
        click={this.handleClick}
        submit={this.props.submitAuth}
      />
    );

  }

  componentWillUpdate(next: Props) {
    if (this.props.isConnected !== next.isConnected) {
      this.props.history.push('/basket');
    }
  }

  handleClick = () => {
    this.props.openAuth();
  }

}

function mapStateToProps(state: Store) {
  return {
    counter: state.toyReducer.counter,
    isConnected: state.authReducer.isConnected,
    isOpened: state.authReducer.isOpened,
    isError: state.authReducer.isError
  };
}

function mapDispatchToProps(dispatch: Dispatch<Props>) {
  return {
    openAuth: () => dispatch( openAuthAction() ),
    submitAuth: (user: UserState) => dispatch( submitAuthAction(user) )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
