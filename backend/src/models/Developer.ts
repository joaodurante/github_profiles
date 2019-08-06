import * as mongoose from 'mongoose';

interface IDeveloper extends mongoose.Document{
    name: string,
    username: string,
    bio: string,
    avatar: string,
    likes: mongoose.Schema.Types.ObjectId[],
    dislikes: mongoose.Schema.Types.ObjectId[]
}

const DeveloperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    avatar: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    }]
}, {
        timestamps: true
    });

const Developer = mongoose.model<IDeveloper>('Developer', DeveloperSchema);

export { Developer, IDeveloper };