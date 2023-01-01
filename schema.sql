# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type Member {
  id: Int!
  email: String!
  password: String!
  name: String!
}

type Query {
  users: String!
}

type Mutation {
  createMember(createMemberDto: CreateMemberDto!): Member!
}

input CreateMemberDto {
  email: String!
  password: String!
  name: String!
}