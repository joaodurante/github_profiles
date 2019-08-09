import axios from 'axios';
import { Developer } from '../models/Developer';
import { env } from '../common/env';
import DefaultError from '../common/DefaultError';

export class DeveloperController {
    index = async (req, res) => {
        try{
            const { user } = req.headers;

            const loggedUser = await Developer.findById(user);

            const users = await Developer.find({
                $and: [
                    { _id: { $ne: user } },
                    { _id: { $nin: loggedUser.likes } },
                    { _id: { $nin: loggedUser.dislikes } }
                ]
            });

            return res.json(users);
        }catch(e){
            throw new DefaultError(e.status, e.message, e.stack);
        }
    }

    store = async (req, res) => {
        try{
            const { username } = req.body;
            const userExists = await Developer.findOne({ username });
            
            if(userExists)
                return res.json(userExists);

            
            const response = await axios.get(`${env.github.userApi}/${username}`);

            let document = await Developer.create({
                name: response.data.name,
                username: response.data.login,
                bio: response.data.bio,
                avatar: response.data.avatar_url
            });
    
            return res.json(document);
            
        }catch(e){
            throw new DefaultError(e.status, e.message, e.stack);
        }
    }
}