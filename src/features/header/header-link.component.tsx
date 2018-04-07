import * as React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export interface HeaderLinkProps {
  click: () => void;
  isConnected: boolean;
  counter: number;
}

export function HeaderLink(props: HeaderLinkProps) {

  const isS = () => props.counter > 1 ? 's' : '';
  const content = `Basket | ${props.counter} item${isS()}`;

  return props.isConnected ?
    <Link className="Header__counter" to="/basket">{content}</Link>
    :
    <article className="Header__counter" onClick={props.click}>{content}</article>
  ;
}
