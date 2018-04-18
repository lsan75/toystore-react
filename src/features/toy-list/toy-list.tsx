import * as React from 'react';
import { ToyComponent, Toy } from './toy';
import './toy-list.css';
import '../../../node_modules/@mdi/font/css/materialdesignicons.min.css';

interface Props {
  toyList: Toy[];
  select: (toy: Toy) => {};
  unselect: () => {};
}

interface State {
  hidden: boolean;
}

export class ToyListComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { hidden: false };
  }

  public content = () => this.props.toyList.map((toy: Toy) => {
    return <ToyComponent key={toy.title} toy={toy} select={this.props.select} />;
  })

  public resize = () => {
    return this.state.hidden ? ({ flexGrow: 0 }) : ({ flexGrow: 1 });
  }

  render() {
    return (
      <main className="ToyListContainer">
        <h1 style={{'paddingLeft': '1rem'}} onClick={() => this.setState({ hidden: !this.state.hidden})}>ToyList</h1>
        <section className="ToyListComponent" style={this.resize()}>{this.content()}</section>
        <section className="ToyList__unselect mdi mdi-close-circle" onClick={this.props.unselect}>Unselect All</section>
      </main>
    );
  }

}