require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

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

app.get('/submissions', async (req, res) => {
  try {
    const snippets = await prisma.snippet.findMany();
    res.json(snippets);
  } catch (error) {
    res.status(500).send({ message: "Error fetching snippets", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
