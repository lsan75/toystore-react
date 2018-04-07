import * as React from 'react';
import './auth.component.css';

interface Props {
  isOpened: boolean;
}
export function AuthComponent(props: Props) {
  const klass = props.isOpened ? 'opened' : '';

  return <div className={`AuthComponent ${klass}`} />;

}
