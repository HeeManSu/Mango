import express, { Request, Response } from 'express';
import errorHandlerMiddleware from './middlewares/errorHandler';

const app = express();

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
    res.send("success defined mrice!");
});

import issueRoutes from './routes/issues';

app.use('/api/v1', issueRoutes);
app.use(errorHandlerMiddleware);


app.listen(port, "0.0.0.0", () => {
    console.log(`App running on http://0.0.0.0:${port}`);
});