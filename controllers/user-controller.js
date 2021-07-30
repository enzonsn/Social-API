const { User, Thought } = require('../models/');

const userController = {
    getAllUsers(req, res){
        User.find({})
            .select('-__v')
            .populate({ path: 'thoughts', select: '-__v' })
            .then(dbUserData => res.json(dbUserData))
            .catch(function(err){ if(err) {console.log(err); res.status(400).json(err);}});
    },
    getUserById({params}, res){
        User.findOne({ _id: params.id })
            .select('-__v')
            .populate({ path: 'thoughts', select: '-__v' })
            .then(dbUserData => {
                if(!dbUserData){ res.status(404).json({message: 'No user found under provided id!'}); return;}
                res.json(dbUserData);})
            .catch(function(err){ if(err) {console.log(err); res.status(400).json(err);}});
    },
    createUser({body}, res){
        User.create(body).then(dbUserData => res.json(dbUserData)).catch(function(err){ if(err) {console.log(err); res.status(400).json(err);}});
    },
    UpdateUser({params, body}, res){
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData){ res.status(404).json({message: 'No user found under provided id!'}); return;}
                res.json(dbUserData);})
            .catch(function(err){ if(err) {console.log(err); res.status(400).json(err);}});
    },
    deleteUser({params}, res){
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData){ res.status(404).json({message: 'No user found under provided id!'}); return;}
                User.updateMany({ _id: {$in: dbUserData.friends} }, { $pull: {friends: params.id} })
                    .then(() =>{
                        Thought.deleteMany({ username: dbUserData.username })
                            .then(() => { res.json({message: 'Succesfully deleted User!'}) })
                            .catch(function(err){ if(err) {console.log(err); res.status(400).json(err);}});
                    })
                    .catch(function(err){ if(err) {console.log(err); res.status(400).json(err);}});
            })
            .catch(function(err){ if(err) {console.log(err); res.status(400).json(err);}});
    },
    addFriend({params}, res){
        User.findOneAndUpdate({_id: params.userId}, {$addToSet: { friends: params.friendId }}, {new: true, runValidators: true})
            .then(dbUserData => {
                if(!dbUserData){ res.status(404).json({message: 'No user found under provided id!'}); return;}
                User.findOneAndUpdate({_id: params.friendId}, {$addToSet: { friends: params.userId }}, {new: true, runValidators: true})
                    .then(dbUserData2 => {
                        if(!dbUserData2){ res.status(404).json({message: 'No user found under provided id!'}); return;}
                        res.json(dbUserData);
                    })
                    .catch(function(err){ if(err) {console.log(err); res.status(400).json(err);}});
            })
            .catch(function(err){ if(err) {console.log(err); res.status(400).json(err);}});
    },
    deleteFriend({params}, res){
        User.findOneAndUpdate({_id: params.userId}, {$pull: { friends: params.userId }}, {new: true, runValidators: true})
            .then(dbUserData => {
                if(!dbUserData){ res.status(404).json({message: 'No user found under provided id!'}); return;}
                User.findOneAndUpdate({_id: params.friendId}, {$pull: { friends: params.userId }}, {new: true, runValidators: true})
                    .then(dbUserData => {
                        if(!dbUserData){ res.status(404).json({message: 'No user found under provided id!'}); return;}
                        res.json({message: 'Successfully deleted friend!'});})
                    .catch(function(err){ if(err) {console.log(err); res.status(400).json(err);}});
            })
            .catch(function(err){ if(err) {console.log(err); res.status(400).json(err);}});
    }
}

