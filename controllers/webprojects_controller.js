const Project = require('../models/Project');

module.exports = {
  index(req, res, next) {
    Project.find({category: 'web'})
      .then((projects)=> res.send(projects))
      .catch(next);
  },

  create(req, res, next) {
    const projectProps = req.body;
    Project.create(projectProps)
      .then(project => res.send(project))
      .catch(next)
  },

  edit(req, res, next) {
    const projectId = req.params.id;
    const projectProps = req.body;

    Project.findByIdAndUpdate({ _id: projectId }, projectProps)
      .then(() => Driver.findById({ _id: id }))
      .then(project => res.send(project))
      .catch(next);
  },

  delete(req, res, next) {
    const projectId = req.params.id;

    Project.findByIdAndRemove({ _id: projectId })
      .then(project => res.status(204).send(project))
      .catch(next);
  }
};
