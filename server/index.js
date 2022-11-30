import express from 'express';
const app = express();
const port = 3000;
import Routes from './routes.js';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = new Routes();
routes.applyRouting(app);

app.listen(port, () => {console.log(`Listening on port ${port}`)});