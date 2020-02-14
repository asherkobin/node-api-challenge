const express = require("express");
const router = express.Router();
const projectDb = require("../data/helpers/projectModel");

router.use(express.json());

router.get("/", async (req, res) => {
  const returnedProject = await projectDb.get();
  
  returnedProject ? res.status(200).json(returnedProject) : res.status(404).json(
    { errorMessage: "Problem getting project" });
});

router.get("/:projectId", validateProjectId, async (req, res) => {
  const projectIdToGet = req.params.projectId;
  const returndProject = await projectDb.get(projectIdToGet);
  
  returndProject ? res.status(200).json(returndProject) : res.status(404).json(
    { errorMessage: "Problem getting projects" });
});

router.get("/:projectId/actions", validateProjectId, async (req, res) => {
  const projectIdToGetActions = req.params.projectId;
  const returndActions = await projectDb.getProjectActions(projectIdToGetActions);
  
  returndActions ? res.status(200).json(returndActions) : res.status(404).json(
    { errorMessage: "Problem getting project actions" });
});

router.post("/", async (req, res) => {
  const projectToAdd = req.body;
  const newproject = await projectDb.insert(projectToAdd);

  newproject ? res.status(200).json(newproject) : res.status(404).json(
    { errorMessage: "Problem creating project" });
});

router.put("/:projectId", validateProjectId, async (req, res) => {
  const projectToUpdate = req.body;
  const projectIdToUpdate = req.params.projectId;
  const updatedProject = await projectDb.update(projectIdToUpdate, { ...projectToUpdate, id: projectIdToUpdate });

  console.log("updatedProject", updatedProject);

  updatedProject ? res.status(200).json(updatedProject) : res.status(404).json(
    { errorMessage: "Problem updating project" });
});

router.delete("/:projectId", validateProjectId, async (req, res) => {
  const projectIdToDelete = req.params.projectId;
  const deletedProject = await projectDb.remove(projectIdToDelete);

  deletedProject ? res.status(200).json(deletedProject) : res.status(404).json(
    { errorMessage: "Problem deleting project" });
});

async function validateProjectId(req, res, next) {
  const projectId = req.params.projectId;
  const projectItem = await projectDb.get(projectId);

  if (projectItem) {
    next();
  }
  else {
    res.status(500).json(`Project with id=${projectId} not found.`);
  }
}

module.exports = router;