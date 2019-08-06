export const env = {
    server:{
        port: process.env.SERVER_PORT || 3333
    },
    db:{
        uri: 'mongodb+srv://joaodurante:passwordtest@cluster0-umwkl.mongodb.net/githubprofiles?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useCreateIndex: true
        }
    },
    github:{
        userApi: 'https://api.github.com/users' 
    }
}