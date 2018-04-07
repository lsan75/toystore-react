import * as React from 'react';

import { connect } from 'react-redux';
import { Store } from '../../store/root';
import { Redirect } from 'react-router-dom';
import { HeaderComponent } from './header.component';

interface Props {
  counter: number;
}
interface State {
  navigate: boolean;
}
export class HeaderContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { navigate: false };
  }

  render() {

    if (this.state.navigate) {
      this.setState(() => ({ navigate: false }));
      return <Redirect to="/basket" push={true} />;
    }

    return (
      <HeaderComponent
        counter={this.props.counter}
        click={this.handleClick}
      />
    );
  }

  handleClick = () => {
    this.setState(() => ({ navigate: true }));
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
