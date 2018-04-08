import * as React from 'react';
import './auth.component.css';

interface Props {
  isOpened: boolean;
  isError: boolean;
  submit: (user: UserState) => void;
}

export interface UserState {
  user: string;
  pass: string;
}

export class AuthComponent extends React.Component<Props, UserState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      user: '',
      pass: ''
    };
  }

  render() {

    const klass = this.props.isOpened ? 'opened' : '';

    return (
      <div className={`AuthComponent ${klass}`}>
        <form onSubmit={this.handleSubmit} className="AuthForm">

          <h2 className="AuthTitle">Please Login</h2>

          <section className="AuthSection">
            <label className="AuthLabel" htmlFor="user">Your Email</label>
            <input
              className="AuthInput"
              type="email"
              value={this.state.user}
              onChange={this.handleChange}
              id="user"
            />
          </section>

          <section className="AuthSection">
            <label className="AuthLabel" htmlFor="pass">Your Password</label>
            <input
              className="AuthInput"
              type="password"
              value={this.state.pass}
              onChange={this.handleChange}
              id="pass"
            />
          </section>

          <section className="AuthSectionButton">
            <input  className="AuthButton" type="submit" value="Submit" />
          </section>

        </form>
      </div>
    );
  }

  private handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.submit(this.state);
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'user':
        this.setState({user: event.target.value});
        break;

      case 'pass':
        this.setState({pass: event.target.value});
        break;

      default:
        return;
    }
  }

}
