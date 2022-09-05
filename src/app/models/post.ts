import { CommentType } from "./comment"

export type Post = {
  aggregateId: string,
  tittle: string,
  author: string,
  comments: CommentType[]
}
