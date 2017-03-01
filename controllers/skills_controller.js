const Skill = require('../models/Skill');

module.exports = {
  index(req, res, next) {
    Skill.find()
      .then((skills)=> res.send(skills))
      .catch(next);
  },

  show(req, res, next){
    const skillId = req.params.id;
    Skill.findOne({_id: skillId})
      .then((skill) => res.send(skill))
      .catch(next);
  },

  create(req, res, next) {
    const skillProps = req.body;
    Skill.create(skillProps)
      .then(skill => res.send(skill))
      .catch(next)
  },
 
  edit(req, res, next) {
    const skillId = req.params.id;
    const skillProps = req.body;

    Skill.findByIdAndUpdate({ _id: skillId }, skillProps)
      .then((skill) => {
        res.send(skill);
      })
      .catch(next);
  },


  delete(req, res, next) {
    const skillId = req.params.id;

    Skill.findByIdAndRemove({ _id: skillId })
      .then((skill) => {
        console.log(work);
        res.status(204).send(skill);
      })
      .catch(next);
  }
};
