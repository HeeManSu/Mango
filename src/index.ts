import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
    res.send("success defined mrice!");
});


app.listen(port, "0.0.0.0", () => {
    console.log(`App running on http://0.0.0.0:${port}`);
});