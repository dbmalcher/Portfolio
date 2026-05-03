const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const portfolioData = {
  name: "Daniel Developer",
  about: "Desenvolvedor Full Stack com paixão por criar soluções inovadoras.",
  skills: [
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Python", level: 75 },
    { name: "PostgreSQL", level: 70 }
  ],
  projects: [
    { 
      id: 1, 
      title: "Portfolio Windows 7", 
      description: "Portfolio com tema do Windows 7",
      technologies: ["React", "Node.js", "CSS"]
    }
  ],
  contact: {
    email: "daniel@email.com",
    github: "github.com/daniel",
    linkedin: "linkedin.com/in/daniel"
  }
};

app.get('/api/about', (req, res) => {
  res.json({ name: portfolioData.name, about: portfolioData.about });
});

app.get('/api/skills', (req, res) => {
  res.json(portfolioData.skills);
});

app.get('/api/projects', (req, res) => {
  res.json(portfolioData.projects);
});

app.get('/api/contact', (req, res) => {
  res.json(portfolioData.contact);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
