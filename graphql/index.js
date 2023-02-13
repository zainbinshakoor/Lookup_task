const { makeExecutableSchema } = require('@graphql-tools/schema')
const typeDefs = require('./types')
const resolvers = require('./resolver')

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

module.exports = schema;