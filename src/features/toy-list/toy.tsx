import * as React from 'react';
import '../../../node_modules/@mdi/font/css/materialdesignicons.min.css';
import './toy.css';

export interface Toy {
  title: string;
  icon: string;
  price: number;
  selected?: boolean;
}

interface Props {
  toy: Toy;
  select: (toy: Toy) => {};
}

export function ToyComponent(props: Props) {

  const component = `
    ToyComponent
    ${props.toy.selected ? 'selected' : ''}
  `;

  const content = `
    ToyComponent__image
    mdi mdi-${props.toy.icon}
  `;

  return (
    <section className={component} onClick={() => props.select(props.toy)}>
      <article className={content} />
      <span className="ToyComponent__text">{props.toy.title}</span>
    </section>
  );

}
