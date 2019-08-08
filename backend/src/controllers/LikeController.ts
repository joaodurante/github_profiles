import { Developer } from '../models/Developer';
import DefaultError from '../common/DefaultError';

export class LikeController{
    store = async (req, res) => {
        try{
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

        }catch(e){
            throw new DefaultError(e.status, e.message, e.stack);
        }
    }
}