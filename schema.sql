# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type Comment {
  """id of post"""
  id: Int!

  """comment of post"""
  comment: String!

  """level of comment"""
  level: Int!
  postId: Int!
  memberId: Int!
  name: String!
  commentId: Int

  """createdAt comment"""
  created_at: DateTime!

  """createdAt comment"""
  updated_at: DateTime!
  reComment: [Comment!]!
}

"""
A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
"""
scalar DateTime

type Post {
  """id of post"""
  id: Int!

  """title of post"""
  title: String!

  """content of post"""
  content: String!

  """ User who wrote the post"""
  name: String!
  memberId: Float!

  """createdAt post"""
  created_at: DateTime!

  """createdAt post"""
  updated_at: DateTime!
  comments: [Comment!]!
}

type Member {
  id: Int!
  email: String!
  password: String!
  name: String!
}

type Query {
  users: String!
  allPosts: [Post!]!
  findPostsByTitle(title: String!): [Post!]!
  findOnePostByPostId(postId: Int!): Post!
  findByMyPost: [Post!]!
}

type Mutation {
  createMember(createMemberDto: CreateMemberDto!): Member!
  updateMember(updateMemberDto: UpdateMemberDto!): Member!
  deleteMember: String!
  createPost(createPostInput: CreatePostInput!): Post!
  deletePost(id: Int!): String!
  createComment(createCommentInput: CreateCommentInput!): Comment!
}

input CreateMemberDto {
  email: String!
  password: String!
  name: String!
}

input UpdateMemberDto {
  password: String!
  name: String!
}

input CreatePostInput {
  """title of post"""
  title: String!

  """title of content"""
  content: String!
}

input CreateCommentInput {
  comment: String!
  level: Int!
  postId: Int!
  commentId: Int
}