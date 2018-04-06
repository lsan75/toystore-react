import * as React from 'react';
import { ToyListComponent } from './toy-list';
import { Toy } from './toy';
import { connect, Dispatch } from 'react-redux';

interface Props {
  toyList: Toy[];
  select: (toy: Toy) => {};
}

export class ToyListContainer extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ToyListComponent
        select={this.props.select}
        toyList={this.props.toyList}
      />
    );
  }

}

function mapStateToProps(state: Store) {
  return {
    toyList: state.toys.toyList
  };
}

function mapDispatchToProps(dispatch: Dispatch<Props>) {
  return {
    select: () => dispatch(selectToy(toy: Toy))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToyListContainer);