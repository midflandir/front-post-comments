import { CommentType } from "./comment"

export type Post = {
  id: string,
  aggregateId: string,
  title: string,
  author: string,
  comments: CommentType[]
}
