import { Developer } from '../models/Developer';
import DefaultError from '../common/DefaultError';
import CustomRequest from '../common/CustomRequest';

export class LikeController{
    store = async (req: CustomRequest, res) => {
        try{
            console.log(req.io, req.connectedUsers);
            const {devId} = req.params;
            const {user} = req.headers;

            const loggedUser = await Developer.findById(user);
            const targetUser = await Developer.findById(devId);
            
            if(!targetUser)
                return res.status(400).json({error: 'Dev not exists!'});
            
            if(targetUser.likes.includes(loggedUser._id)){
                
                const loggedSocket = req.connectedUsers[loggedUser._id];
                const targetSocket = req.connectedUsers[devId];

                if(loggedSocket)
                    req.io.to(loggedSocket).emit('match', targetUser);

                if(targetSocket)
                    req.io.to(targetSocket).emit('match', loggedUser);
            }
                

            loggedUser.likes.push(targetUser._id);
            await loggedUser.save();
            return res.json(loggedUser);

        }catch(e){
            throw new DefaultError(e.status, e.message, e.stack);
        }
    }
}