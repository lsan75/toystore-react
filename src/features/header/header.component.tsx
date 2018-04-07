import * as React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

interface Props {
  click: () => void;
  counter: number;
}

export function HeaderComponent(props: Props) {

  const isS = () => props.counter > 1 ? 's' : '';

  return (
    <header className="Header">
      <Link to="/" className="Header__title">ToyStore</Link>
      <article className="Header__counter" onClick={props.click}>
        Basket | {props.counter} item{isS()}
      </article>
    </header>
  );
}