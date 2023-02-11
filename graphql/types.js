const { gql } = require('apollo-server-express');
const typeDefs = gql `
type doctors{
id:Int
name:String
address:String
}
type Query {
doctorsData :[doctors!]!
}


`;
module.exports = {typeDefs}