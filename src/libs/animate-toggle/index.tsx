import * as React from 'react';

export interface Props {
  open: boolean;
  duration: number;
}

export interface State {
  height: string;
  shouldUseTransition: boolean;
}

export default class AnimateToggle extends React.Component<Props, State> {

  private contentElement: HTMLDivElement | null;
  private clearTimer: NodeJS.Timer;
  private auto: string = 'auto';
  private zero: string = '0px';

  constructor(props: Props) {
    super(props);
    this.state = {
      height: props.open ? this.auto : this.zero,
      shouldUseTransition: false
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    nextProps.open ? this.manageOpen() : this.manageClose();
  }

  render() {
    const { duration, children } = this.props;
    const { height, shouldUseTransition } = this.state;

    const style: React.CSSProperties = {
      height,
      transition: shouldUseTransition ? `height ${duration}ms ease-in-out` : '',
      overflow: 'hidden'
    };

    return (
      <section style={style}>
        <div ref={el => this.contentElement = el}>
          {children}
        </div>
      </section>
    );
  }

  private manageOpen = () => {

    // If open set to true and component closed, retrieve the real component height
    if (this.state.height === this.zero) {
      this.setHeightToRealHeight();

      // return because next condition is now true
      // forceUdpdate to reload componentWillReceiveProps
      this.forceUpdate();
    }

    // if open set to true and component has real height, set height to auto after duration
    if (this.state.height !== this.auto) {
      clearTimeout(this.clearTimer);
      this.clearTimer = setTimeout(this.setHeightToAuto, this.props.duration);
    }
  }

  private manageClose = () => {

    // if open set to false and height set to auto, retrieve the real height
    if (this.state.height === this.auto) {
      this.setHeightToRealHeight();

      // return because next condition is now true
      // forceUdpdate to reload componentWillReceiveProps
      this.forceUpdate();
    }

    // if open set to false and height not zero, set height to 0
    if (this.state.height !== this.zero) {
      this.setHeightToZero();
    }
  }

  private setHeightToAuto = () => {

    // prevent transition when component set from real height to auto
    this.setState({
      height: this.auto,
      shouldUseTransition: false
    });
  }

  private setHeightToZero = () => {

    // call RAF for smooth transition
    requestAnimationFrame(() => {
      this.setState({
        height: this.zero,
        shouldUseTransition: true
      });
    });
  }

  private setHeightToRealHeight = () => {

    const height = this.contentElement ? `${this.contentElement.offsetHeight}px` : this.zero;

    this.setState({
      height,
      shouldUseTransition: true
    });
  }
}
