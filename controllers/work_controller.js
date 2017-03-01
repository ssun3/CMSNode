const Work = require('../models/Work');

module.exports = {
  index(req, res, next) {
    Work.find()
      .then((works)=> res.send(works))
      .catch(next);
  },

  show(req, res, next){
    const workId = req.params.id;
    Work.findOne({_id: workId})
      .then((work) => res.send(work))
      .catch(next);
  },

  create(req, res, next) {
    const workProps = req.body;
    Work.create(workProps)
      .then(work => res.send(work))
      .catch(next)
  },
 
  edit(req, res, next) {
    const workId = req.params.id;
    const workProps = req.body;

    Work.findByIdAndUpdate({ _id: workId }, workProps)
      .then((work) => {
        res.send(work);
      })
      .catch(next);
  },


  delete(req, res, next) {
    //feature to add: delete all associated files from S3 bucket.
    const workId = req.params.id;

    Work.findByIdAndRemove({ _id: workId })
      .then((work) => {
        console.log(work);
        res.status(204).send(work);
      })
      .catch(next);
  }
};
