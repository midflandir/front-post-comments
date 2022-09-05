import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Post } from '../models/post';
import { createPost } from '../models/createPost';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private client:HttpClient) { }

  bringAllpost(){
    return this.client.get<Post[]>('http://localhost:8080/bring/all/posts')
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  createPost(command:createPost):Observable<Object>{
   return this.client.post('http://localhost:8080/create/post', command, this.httpOptions)
  }


}
