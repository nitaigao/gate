const Redis = require("redis")
const redis = Redis.createClient()

const OPEN = "open"
const OPENING = "opening"
const CLOSED = "closed"
const CLOSING = "closing"

const ACTION_TIME = 1000 * 10 // seconds
const CHANNEL = "gate"

class Gate {
  constructor() {
    this.state = CLOSED
  }

  open() {
    if (this.state !== CLOSED) {
      return
    }

    this.state = OPENING
    redis.publish(CHANNEL, this.state)

    setTimeout(() => {
      this.state = OPEN
      redis.publish(CHANNEL, this.state)
    }, ACTION_TIME)
  }

  close() {
    if (this.state !== OPEN) {
      return
    }

    this.state = CLOSING
    redis.publish(CHANNEL, this.state)

    setTimeout(() => {
      this.state = CLOSED
      redis.publish(CHANNEL, this.state)
    }, ACTION_TIME)
  }

  toggle(gateCount) {
    if (gateCount == 1) {
      console.log("Toggle a single gate")
    }

    if (gateCount == 2) {
      console.log("Toggle both gates")
    }

    if (this.state === OPEN) {
      this.state = CLOSED
    } else if (this.state === CLOSED) {
      this.state = OPEN
    }

    console.error("Can only toggle 1 or 2 gates")
  }

  status() {
    return this.state
  }
}

export default Gate
