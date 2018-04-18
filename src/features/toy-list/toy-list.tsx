import * as React from 'react';
import { ToyComponent, Toy } from './toy';
import './toy-list.css';
import '../../../node_modules/@mdi/font/css/materialdesignicons.min.css';
import AnimateHeight from 'react-animate-height';

interface Props {
  toyList: Toy[];
  select: (toy: Toy) => {};
  unselect: () => {};
}

interface State {
  height: number | string;
}

export class ToyListComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { height: 'auto' };
  }

  render() {
    const { height } = this.state;
    return (
      <main>
        <h1 style={{'paddingLeft': '1rem'}} onClick={this.toggle}>ToyList</h1>
        <AnimateHeight height={height} duration={200}>
          <section className="ToyListComponent">{this.content()}</section>
        </AnimateHeight>
        <section className="ToyList__unselect mdi mdi-close-circle" onClick={this.props.unselect}>Unselect All</section>
      </main>
    );
  }

  private toggle = () => {
    const { height } = this.state;

    this.setState({
      height: height === 0 ? 'auto' : 0
    });
  }

  private content = () => this.props.toyList.map((toy: Toy) => {
    return <ToyComponent key={toy.title} toy={toy} select={this.props.select} />;
  })

}