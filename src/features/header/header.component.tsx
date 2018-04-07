import * as React from 'react';
import { Link } from 'react-router-dom';
import { HeaderLink, HeaderLinkProps } from './header-link.component';

import './header.css';

export function HeaderComponent(props: HeaderLinkProps) {

  return (
    <header className="Header">

      <Link to="/" className="Header__title">ToyStore</Link>

      <HeaderLink
        click={props.click}
        isConnected={props.isConnected}
        counter={props.counter}
      />

    </header>
  );
}
