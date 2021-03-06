import * as React from 'react'
import { Toy } from './toy'
import ToyComponent from './toy'
import './toy-list.css'
import '../../../node_modules/@mdi/font/css/materialdesignicons.min.css'
import AnimateToggle from '../../libs/animate-toggle'

export interface Props {
  toyList: Toy[]
  select: (toy: Toy) => {}
  unselect: () => {}
}

export interface State {
  open: boolean
}

export class ToyListComponent extends React.Component<Props, State> {

  private content = ((toy: Toy) => {
    return <ToyComponent key={toy.title} toy={toy} select={this.props.select} />
  })

  constructor(props: Props) {
    super(props)
    this.state = { open: true }
  }

  render() {
    const { open } = this.state
    return (
      <main>
        <h1 style={{'paddingLeft': '1rem'}} onClick={this.toggle}>ToyList</h1>

        <AnimateToggle open={open} duration={300}>
          <section className="ToyListComponent">{this.props.toyList.map(this.content)}</section>
        </AnimateToggle>

        <section className="ToyList__unselect mdi mdi-close-circle" onClick={this.props.unselect}>Unselect All</section>
      </main>
    )
  }

  private toggle = () => {
    const { open } = this.state

    this.setState({
      open: !open
    })
  }

}