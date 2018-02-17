import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import Gate from "./gate"

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const gate = new Gate()

const DEVELOPMENT = process.env.NODE_ENV !== "production"

app.use(morgan(DEVELOPMENT ? "dev" : "combined"))

app.get("/", (req, res) => res.sendStatus(200))

app.post("/open", (req, res) => {
  res.sendStatus(200)
  gate.open()
})

app.post("/close", (req, res) => {
  res.sendStatus(200)
  gate.close()
})

app.post("/toggle", (req, res) => {
  gate.toggle(req.body.gates || 1)
  res.sendStatus(200)
})

app.get("/status", (req, res) => {
  const status = gate.status()
  res.send({ status })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
