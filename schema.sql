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
  updateMember(updateMemberDto: UpdateMemberDto!): Member!
  deleteMember(id: Int!): String!
}

input CreateMemberDto {
  email: String!
  password: String!
  name: String!
}

input UpdateMemberDto {
  id: Float!
  password: String!
  name: String!
}