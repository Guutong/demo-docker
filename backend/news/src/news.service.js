const { News } = require('./database/news.model')

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const news = new News({
    title: req.body.title,
    description: req.body.description,
  });

  // Save News in the database
  News
    .create(news)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the News."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  News.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving News."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  News.findById(id)
    .then(data => {
      if (!data) res.status(404).send({ message: "Not found News with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving News with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  News.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update News with id=${id}. Maybe News was not found!`
        });
      } else res.send({ message: "News was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating News with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  News.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete News with id=${id}. Maybe News was not found!`
        });
      } else {
        res.send({
          message: "News was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete News with id=" + id
      });
    });
};
