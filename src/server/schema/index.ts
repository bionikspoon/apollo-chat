import { gql, PubSub } from 'apollo-server-koa'

const pubsub = new PubSub()

export const typeDefs = gql`
  type Subscription {
    postAdded: Post
  }
  type Query {
    posts: [Post]
  }
  type Mutation {
    addPost(author: String, comment: String): Post
  }
  type Post {
    author: String
    comment: String
  }
`
const POST_ADDED = 'POST_ADDED'

let POSTS: IPost[] = [
  { author: 'Jane Doe', comment: 'hello world' },
  { author: 'Joe Sixpack Doe', comment: 'I like turtles' },
]

const posts = () => POSTS
interface IPost {
  author: string
  comment: string
}
const addPost = (newPost: IPost): IPost[] => {
  POSTS = [...POSTS, newPost]
  return POSTS
}
export const resolvers = {
  Mutation: {
    addPost: (root: any, args: any, context: any) => {
      pubsub.publish(POST_ADDED, { postAdded: args })
      return addPost(args)
    },
  },
  Query: {
    posts: (root: any, args: any, context: any) => posts(),
  },
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
  },
}
