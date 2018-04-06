import * as React from 'react';

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
    mdi-icon-${props.toy.icon}
    ${props.toy.selected ? 'selected' : ''}
  `;

  return (
    <article
      className={classname}
      onClick={() => props.select(props.toy)}
    />
  );

}
