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

  const classname = `
    ToyComponent
    mdi mdi-${props.toy.icon}
    ${props.toy.selected ? 'selected' : ''}
  `;

  return (
    <article
      className={classname}
      onClick={() => props.select(props.toy)}
    />
  );

}
