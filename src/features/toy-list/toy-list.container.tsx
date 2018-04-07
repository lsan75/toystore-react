import * as React from 'react';
import { ToyListComponent } from './toy-list';
import { Toy } from './toy';
import { connect, Dispatch } from 'react-redux';
import { Store } from '../../store/root';
import { selectToyAction, getToysAction } from '../../store/toy/toy.action';
import { ToyAction } from '../../store/toy/toy.reducer';

interface Props {
  toyList: Toy[];
  select: (toy: Toy) => ToyAction;
  getToys: () => ToyAction;
}

export class ToyListContainer extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.getToys();
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
    toyList: state.toyReducer.toys
  };
}

function mapDispatchToProps(dispatch: Dispatch<Props>) {
  return {
    select: (toy: Toy) => dispatch( selectToyAction(toy) ),
    getToys: () => dispatch( getToysAction() )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToyListContainer);