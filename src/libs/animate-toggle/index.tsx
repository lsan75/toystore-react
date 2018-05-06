import * as React from 'react'

export interface Props {
  open: boolean
  duration: number
}

export interface State {
  height: string
  shouldUseTransition: boolean
}

export default class AnimateToggle extends React.PureComponent<Props, State> {

  private contentElement: HTMLDivElement | null
  private clearTimer: NodeJS.Timer
  private auto: string = 'auto'
  private zero: string = '0px'

  constructor(props: Props) {
    super(props)
    this.state = {
      height: props.open ? this.auto : this.zero,
      shouldUseTransition: false
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    nextProps.open ? this.doOpen(nextProps.duration) : this.doClose()
  }

  componentWillUnmount() {
    clearTimeout(this.clearTimer)
  }

  render() {
    const { duration, children } = this.props
    const { height, shouldUseTransition } = this.state

    const style: React.CSSProperties = {
      height,
      transition: shouldUseTransition ? `height ${duration}ms ease-in-out` : '',
      overflow: 'hidden'
    }

    return (
      <section style={style}>
        <div ref={el => this.contentElement = el}>
          {children}
        </div>
      </section>
    )
  }

  private doOpen = (duration: number) => {

    // prevent scroll if height not zero (duration might change)
    if (this.state.height !== this.zero) { return }

    this.setHeightToRealHeight(true)

    clearTimeout(this.clearTimer)
    this.clearTimer = setTimeout(this.setHeightToAuto, duration)
  }

  private doClose = () => {

    // prevent scroll if height already zero (duration might change)
    if (this.state.height === this.zero) { return }

    this.setHeightToRealHeight(false)
    this.setHeightToZero()
  }

  private setHeightToAuto = () => {

    this.setState({
      height: this.auto,
      shouldUseTransition: false
    })
  }

  private setHeightToZero = () => {

    // requestAnimationFrame for smooth transition needed
    requestAnimationFrame(() => {
      this.setState({
        height: this.zero,
        shouldUseTransition: true
      })
    })
  }

  private setHeightToRealHeight = (shouldUseTransition: boolean) => {

    const height = this.contentElement ? `${this.contentElement.offsetHeight}px` : this.zero

    this.setState({
      height,
      shouldUseTransition
    })
  }
}
