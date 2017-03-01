const Project = require('../models/Project');
const Work = require('../models/Work');
const _ = require('lodash');

module.exports = {
  index(req, res, next) {
    Project.find({category: 'web'})
      .populate('workplace')
      .then((projects)=> res.send(projects))
      .catch(next);
  },

  show(req, res, next) {
    const projectId = req.params.id;
    Project.findOne({_id: projectId})
      .populate('workplace')
      .then((project)=> res.send(project))
      .catch(next);
  }, 

  create(req, res, next) {
    const workplaceObject = mongoose.Types.ObjectId(req.body.workplace);
    const projectProps = _.assign({}, req.body, {workplace: workplaceObject});
    Project.create(projectProps)
      .then(project => res.send(project))
      .catch(next)
  },
 
  edit(req, res, next) {
    const projectId = req.params.id;
    //const projectProps = _.omit(req.body, 'workplace');
    const workplaceObject = mongoose.Types.ObjectId(req.body.workplace);
    const projectProps = _.assign({}, req.body, {workplace: workplaceObject});

    Project.findByIdAndUpdate({ _id: projectId }, projectProps)
      .then((project) => {
        res.send(project);
      })
      .catch(next);
  },


  delete(req, res, next) {
    //feature to add: delete all associated files from S3 bucket.
    const projectId = req.params.id;

    Project.findByIdAndRemove({ _id: projectId })
      .then((project) => {
        console.log(project);
        res.status(204).send(project);
      })
      .catch(next);
  }
};
