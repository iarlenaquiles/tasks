const express = require("express");

const server = express();

server.use(express.json());

checkProjectIdExists = (req, res, next) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
};

let numberOfRequests = 0;

logRequests = (req, res, next) => {
  numberOfRequests++;
  console.log(`Numeros de requisições: ${numberOfRequests}`);
  return next();
};

server.use(logRequests);

const projects = [];

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  projects.push({ id, title, tasks: [] });
  return res.json(projects);
});

server.post("/projects/:id/tasks", checkProjectIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.put("/projects/:id", checkProjectIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;
  return res.json(project);
});

server.delete("/projects/:id", checkProjectIdExists, (req, res) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);
  projects.splice(project, 1);
  return res.send();
});

server.listen(3000);
