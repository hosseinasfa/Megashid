const controller = require("app/http/controllers/controller");
const Connection = require("app/models/connection");
const { body, validationResult } = require("express-validator");
const { createRandomName } = require("app/http/services/randomName");

class connectionController extends controller {
  async index(req, res) {
    res.json("Megashid Task");
  }

  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let { value , ts } = req.body;
      const name = createRandomName();

      //create connection
      let newConnection = new Connection({
        name,
        value,
        slug: name,
        ts,
      });

      await newConnection.save();

      return res.status(201).json("connection saved successfully!");
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }

  async getAllConnections(req, res, next) {
    let connections = await Connection.find();
    res.json(connections);
  }

  async update(req, res, next) {
    let { value , ts } = req.body;
    const name = createRandomName();

    try {
      //update connection
      const updatedConnection = await Connection.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name,
            value,
            slug: name,
            ts,
          },
        }
      );

      if (!updatedConnection) {
        return res.status(404).json({ error: "Connection not found" });
      }

      res.status(200).json("connection updated successfully!");
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }

  async destroy(req, res, next) {
    try {
      const deletedConnection = await Connection.findByIdAndDelete(req.params.id);
      if (!deletedConnection) {
        return res.status(404).json({ error: "Connection not found" });
      }
      res.status(200).json({ message: "Connection deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
  }
}

module.exports = new connectionController();
