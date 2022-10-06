module.exports = () => {
    const router = require("express").Router();
    const newsService = require("./news.service.js");
    router.post("/", newsService.create); // Create a News
    router.get("/", newsService.findAll); // Retrieve all News
    router.get("/:id", newsService.findOne); // Retrieve a single News with id
    router.put("/:id", newsService.update); // Update a News with id
    router.delete("/:id", newsService.delete); // Delete a News with id
    return router
  };
  