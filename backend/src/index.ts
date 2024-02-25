import express from "express"

const app: express.Application = express()

app.get('/', (req: express.Request, res: express.Response) => res.send('Hello'))

app.listen(3000, () => console.log('listening to port 3000'))