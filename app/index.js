import express from "express"
import Gate from "./gate"

const app = express()

const gate = new Gate()

app.get("/", (req, res) => res.sendStatus(200))

app.post("/open", (req, res) => {
  res.sendStatus(200)
  gate.open()
})

app.post("/close", (req, res) => {
  res.sendStatus(200)
  gate.close()
})

app.get("/status", (req, res) => {
  const status = gate.status()
  res.send({ status })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
