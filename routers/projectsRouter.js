const express = require("express");
const router = express.Router();
const projectDb = require("../data/helpers/projectModel");

router.use(express.json());

router.get("/", async (req, res) => {
  const returnedProject = await projectDb.get();
  
  returnedProject ? res.status(200).json(returnedProject) : res.status(404).end();
});

router.get("/:projectId", async (req, res) => {
  const projectIdToGet = req.params.projectId;
  const returndProject = await projectDb.get(projectIdToGet);
  
  returndProject ? res.status(200).json(returndProject) : res.status(404).end();
});

router.get("/:projectId/actions", async (req, res) => {
  const projectIdToGetActions = req.params.projectId;
  const returndActions = await projectDb.getProjectActions(projectIdToGetActions);
  
  returndActions ? res.status(200).json(returndActions) : res.status(404).end();
});

router.post("/", async (req, res) => {
  const projectToAdd = req.body;
  const newproject = await projectDb.insert(projectToAdd);

  newproject ? res.status(200).json(newproject) : res.status(404).end();
});

router.put("/:projectId", async (req, res) => {
  const projectToUpdate = req.body;
  const projectIdToUpdate = req.params.projectId;
  const updatedProject = await projectDb.update(projectIdToUpdate, { ...projectToUpdate, id: projectIdToUpdate });

  console.log("updatedProject", updatedProject);

  updatedProject ? res.status(200).json(updatedProject) : res.status(404).end();
});

router.delete("/:projectId", async (req, res) => {
  const projectIdToDelete = req.params.projectId;
  const deletedProject = await projectDb.remove(projectIdToDelete);

  deletedProject ? res.status(200).json(deletedProject) : res.status(404).end();
});

module.exports = router;