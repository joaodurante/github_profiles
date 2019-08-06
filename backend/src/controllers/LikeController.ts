import { Developer } from '../models/Developer';

export class LikeController{
    store = async (req, res) => {
        const {devId} = req.params;
        const {user} = req.headers;

        const loggedUser = await Developer.findById(user);
        const targetUser = await Developer.findById(devId);

        if(!targetUser)
            return res.status(400).json({error: 'Dev not exists!'});
        
        if(targetUser.likes.includes(loggedUser._id))
            console.log('MATCH!');

        loggedUser.likes.push(targetUser._id);
        await loggedUser.save();
        return res.json(loggedUser);
        
    }
}