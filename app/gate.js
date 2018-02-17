const OPEN = 'open'
const OPENING = 'opening'
const CLOSED = 'closed'
const CLOSING = 'closing'

const ACTION_TIME = 1000 * 10 // seconds

class Gate {
  constructor() {
    this.state = CLOSED
  }

  open() {
    if (this.state !== CLOSED) {
      return
    }

    this.state = OPENING

    setTimeout(() => {
      this.state = OPEN
    }, ACTION_TIME)
  }

  close() {
    if (this.state !== OPEN) {
      return
    }

    this.state = CLOSING

    setTimeout(() => {
      this.state = CLOSED
    }, ACTION_TIME)
  }

  status() {
    return this.state
  }
}

export default Gate
