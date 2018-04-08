import * as React from 'react';
import { Link } from 'react-router-dom';
import { HeaderLink } from './header-link.component';
import { AuthComponent, UserState } from '../auth/auth.component';

interface HeaderLinkProps {
  click: () => void;
  submit: (user: UserState) => void;
  isConnected: boolean;
  isOpened: boolean;
  isError: boolean;
  counter: number;
}

export function HeaderComponent(props: HeaderLinkProps) {

  const isS = () => props.counter > 1 ? 's' : '';
  const content = `Basket | ${props.counter} item${isS()}`;

  return (
    <header className="Header">

      <Link to="/" className="Header__title">ToyStore</Link>

      <HeaderLink
        click={props.click}
        isConnected={props.isConnected}
        counter={props.counter}
      >
        {content}
      </HeaderLink>

      <AuthComponent
        isOpened={props.isOpened}
        isError={props.isError}
        submit={props.submit}
      />
    </header>
  );

}
