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
    nextProps.open ? this.manageOpen(nextProps.duration) : this.manageClose()
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

  private manageOpen = (duration: number) => {

    // prevent scroll if height not to zero (duration might change)
    if (this.state.height !== this.zero) { return }

    // 1. First pass
    this.setHeightToRealHeight(true)

    // 2. Second pass
    clearTimeout(this.clearTimer)
    this.clearTimer = setTimeout(this.setHeightToAuto, duration)
  }

  private manageClose = () => {

    // prevent scroll if height already zero (duration might change)
    if (this.state.height === this.zero) { return }

    // 1. First pass
    this.setHeightToRealHeight(false)

    // 2. Second pass
    this.setHeightToZero()
  }

  private setHeightToAuto = () => {

    this.setState({
      height: this.auto,
      shouldUseTransition: false
    })
  }

  private setHeightToZero = () => {

    // Call RAF for smooth transition
    requestAnimationFrame(() => {
      this.setState({
        height: this.zero,
        shouldUseTransition: true
      })
    })
  }

  private setHeightToRealHeight = async (shouldUseTransition: boolean) => {

    const height = this.contentElement ? `${this.contentElement.offsetHeight}px` : this.zero

    // async await needed to sync the flow for the next step
    return await this.setState({
      height,
      shouldUseTransition
    })
  }
}
