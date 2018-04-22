import * as React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

export interface HeaderLinkProps {
  click: () => void
  isConnected: boolean
  counter: number
  children: string
}

export function HeaderLink(props: HeaderLinkProps) {

  return props.isConnected ?
    <Link className="Header__counter" to="/basket">{props.children}</Link>
    :
    <article className="Header__counter" onClick={props.click}>{props.children}</article>

}
