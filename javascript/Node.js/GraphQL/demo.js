const {
    ApolloServer,
    gql
} = require('apollo-server');
const DataLoader = require('dataloader');

const userModel = (() => {
    const users = [{
            id: 1,
            name: 'A',
            postIds: [6, 7, 8]
        },
        {
            id: 2,
            name: 'B',
            postIds: [6, 8, 9, 10]
        },
        {
            id: 3,
            name: 'C',
            postIds: [6, 7, 10]
        },
        {
            id: 4,
            name: 'D',
            postIds: [6, 7, 9]
        },
        {
            id: 5,
            name: 'E',
            postIds: [6, 7, 10]
        }
    ];

    const posts = [{
            id: 6,
            title: '王'
        },
        {
            id: 7,
            title: '松'
        },
        {
            id: 8,
            title: '变'
        },
        {
            id: 9,
            title: '胖',
        },
        {
            id: 10,
            title: '了'
        }
    ];

    const genPromise = (value, text) =>
        new Promise(resolve => {
            setTimeout(() => {
                console.log(text);
                return resolve(value);
            }, 100);
        });

    return {
        getPostsByIds: ids =>
            genPromise(
                posts.filter(post => ids.includes(post.id)),
                `getPostsByIds: ${ids}`
            ),
        getAllUsers: () => genPromise(users, 'getAllUsers')
    };
})();

const typeDefs = gql `
  type Query {
    allUsers: [User]
  }

  type User {
    id: Int
    name: String
    posts: [Post]
  }

  type Post {
    id: Int
    title: String
  }
`;

const resolvers = {
    Query: {
        allUsers(root, args, { userModel }) {
            return userModel.getAllUsers();
        }
    },
    User: {
        // async posts(user, args) {
        //     return userModel.getPostsByIds(user.postIds)
        // },
        async posts(user, args, { dataloaders }) {
            return dataloaders.posts.loadMany(user.postIds)
        }
    }
};

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     tracing: true,
//     context: async ({
//         req
//     }) => {
//         return {
//             userModel
//         };
//     }
// });

const server = new ApolloServer({
    typeDefs,
    resolvers,
    tracing: true,
    context: async ({ req }) => {
        return {
            userModel,
            dataloaders: {
                posts: new DataLoader(async postIds => {
                    const posts = await userModel.getPostsByIds(postIds)
                    return posts
                })
            }
        }
    }
});

server.listen().then(({
    url
}) => {
    console.log(`Server ready at ${url}`);
});
