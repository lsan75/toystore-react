import * as React from 'react';
import { ToyComponent, Toy } from './toy';
import './toy-list.css';
import '../../../node_modules/@mdi/font/css/materialdesignicons.min.css';

interface Props {
  toyList: Toy[];
  select: (toy: Toy) => {};
  unselect: () => {};
}

export function ToyListComponent(props: Props) {

  const content = props.toyList.map((toy: Toy) => {
    return <ToyComponent key={toy.title} toy={toy} select={props.select} />;
  });

  return (
    <main>
      <section className="ToyListComponent">{content}</section>
      <section className="ToyList__unselect mdi mdi-close-circle" onClick={props.unselect}>Unselect All</section>
    </main>
  );

}