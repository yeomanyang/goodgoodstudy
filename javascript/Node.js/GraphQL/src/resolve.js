const {
    find,
    filter
} = require('lodash');

// example data
const authors = [{
        id: 1,
        name: 'Tom'
    },
    {
        id: 2,
        name: 'Sashko'
    },
    {
        id: 3,
        name: 'Mikhail'
    },
];

const posts = [{
        id: 1,
        authorId: 1,
        title: 'Introduction to GraphQL'
    },
    {
        id: 2,
        authorId: 1,
        title: 'Welcome to Meteor'
    },
    {
        id: 3,
        authorId: 1,
        title: 'Advanced GraphQL'
    },
    {
        id: 4,
        authorId: 3,
        title: 'Launchpad is Cool'
    },
];

const resolvers = {
    Query: {
        posts: () => posts,
        author: (_, {
            id
        }) => find(authors, {
            id
        }),
    },

    Author: {
    },

    Post: {
        author:  post => {
            const author = find(authors, {
                id: post.authorId
            });
            console.log(`query${author.name}`);
            return author;
        }
    }
};

exports.resolvers = resolvers;
