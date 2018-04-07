import * as React from 'react';
import { ToyComponent, Toy } from './toy';
import './toy-list.css';

interface Props {
  toyList: Toy[];
  select: (toy: Toy) => {};
}

export function ToyListComponent(props: Props) {

  const content = props.toyList.map((toy: Toy) => {
    return <ToyComponent key={toy.title} toy={toy} select={props.select} />;
  });

  return (
    <section className="ToyListComponent">{content}</section>
  );

}