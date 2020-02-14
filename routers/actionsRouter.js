const express = require("express");
const router = express.Router();
const actionDb = require("../data/helpers/actionModel");

router.use(express.json());

router.get("/", async (req, res) => {
  const returnedActions = await actionDb.get();
  
  returnedActions ? res.status(200).json(returnedActions) : res.status(404).end();
});

router.get("/:actionId", async (req, res) => {
  const actionIdToGet = req.params.actionId;
  const returndAction = await actionDb.get(actionIdToGet);
  
  returndAction ? res.status(200).json(returndAction) : res.status(404).end();
});

router.post("/", async (req, res) => {
  const actionToAdd = req.body;
  const newAction = await actionDb.insert(actionToAdd);

  newAction ? res.status(200).json(newAction) : res.status(404).end();
});

router.put("/:actionId", async (req, res) => {
  const actionToUpdate = req.body;
  const actionIdToUpdate = req.params.actionId;
  const updatedAction = await actionDb.update(actionIdToUpdate, { ...actionToUpdate, id: actionIdToUpdate });

  updatedAction ? res.status(200).json(updatedAction) : res.status(404).end();
});

router.delete("/:actionId", async (req, res) => {
  const actionIdToDelete = req.params.actionId;
  const deletedAction = await actionDb.remove(actionIdToDelete);

  deletedAction ? res.status(200).json(deletedAction) : res.status(404).end();
});

module.exports = router;