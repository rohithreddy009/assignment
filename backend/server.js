require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', async(req, res) => {
    res.send('Hello World!');
  });

// POST endpoint for submitting code snippets
app.post('/submit', async (req, res) => {
  const { username, codeLanguage, stdin, sourceCode } = req.body;
  try {
    const snippet = await prisma.snippet.create({
      data: {
        username,
        codeLanguage,
        stdin,
        sourceCode,
      },
    });
    res.json(snippet);
  } catch (error) {
    res.status(500).send({ message: "Error creating the snippet", error: error.message });
  }
});

// GET endpoint to fetch all submissions
app.get('/submissions', async (req, res) => {
  try {
    const snippets = await prisma.snippet.findMany({
      select: {
        username: true,
        codeLanguage: true,
        stdin: true,
        sourceCode: true,
        createdAt: true,
      },
    });
    res.json(snippets);
  } catch (error) {
    res.status(500).send({ message: "Error fetching snippets", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
