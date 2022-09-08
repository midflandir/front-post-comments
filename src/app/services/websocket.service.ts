import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Post } from '../models/post';
import { CommentType } from 'src/app/models/comment';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }


websocketgeneral():WebSocketSubject<Post>{
  return webSocket('ws://localhost:8082/retrieve/mainSpace')
}

websocketComment(postid:string):WebSocketSubject<CommentType>{
  return webSocket('ws://localhost:8082/retrieve/' + postid)

}

}
