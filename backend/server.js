require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');

const prisma = new PrismaClient();
const app = express();
const REDIS_PORT = 12295; 
const REDIS_HOST = process.env.REDIS_HOST; 
const REDIS_PASSWORD = process.env.REDIS_PASSWORD; 


const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    password: REDIS_PASSWORD
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

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
    await redisClient.del('submissionsCache');
    res.json(snippet);
  } catch (error) {
    res.status(500).send({ message: "Error creating the snippet", error: error.message });
  }
});

app.get('/submissions', async (req, res) => {
  // Try to fetch cached submissions
  const cacheSubmissions = await redisClient.get('submissionsCache');
  if (cacheSubmissions) {
    return res.json(JSON.parse(cacheSubmissions));
  }

  try {
    const snippets = await prisma.snippet.findMany();
    await redisClient.setEx('submissionsCache', 600, JSON.stringify(snippets));
    res.json(snippets);
  } catch (error) {
    res.status(500).send({ message: "Error fetching snippets", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
