const { User, Throught, Reaction, Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({})
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {console.log(err); res.status(400).json(err);});
    },
    getThoughtById({params}, res){
        Thought.findOne({_id: params.id})
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData){ res.status(404).json({message: 'No thought found under provided id!'}); return;}
                res.json(dbThoughtData);
            })
            .catch(err => {console.log(err); res.status(400).json(err);});
    },
    createThought({body}, res){
        Thought.create(body)
            .then(dbThoughtData => {

            })
            .catch(err => {console.log(err); res.status(400).json(err);});
    }
}

module.exports = thoughtController;