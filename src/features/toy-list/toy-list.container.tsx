import * as React from 'react'
import { ToyListComponent } from './toy-list'
import { Toy } from './toy'
import { connect, Dispatch } from 'react-redux'
import { Store } from '../../store/root'
import * as ToyActions from '../../store/toy/toy.action'
import { ToyAction } from '../../store/toy/toy.reducer'

export interface Props {
  toyList: Toy[]
  select: (toy: Toy) => ToyAction
  getToys: () => ToyAction
  unselect: () => ToyAction
}

export class ToyListContainer extends React.Component<Props> {

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    this.props.getToys()
  }

  render() {
    return (
      <ToyListComponent
        select={this.props.select}
        unselect={this.props.unselect}
        toyList={this.props.toyList}
      />
    )
  }

}

function mapStateToProps(state: Store) {
  return {
    toyList: state.toyReducer.toyList
  }
}

function mapDispatchToProps(dispatch: Dispatch<Props>) {
  return {
    select: (toy: Toy) => dispatch( ToyActions.selectToyAction(toy) ),
    getToys: () => dispatch( ToyActions.getToysAction() ),
    unselect: () => dispatch( ToyActions.unselectAllAction() )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToyListContainer)
