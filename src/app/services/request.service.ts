import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Post } from '../models/post';
import { createPost } from '../models/createPost';
import { createComment } from '../models/createComment';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  constructor(private client:HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }
  bringAllpost(){
     // return this.client.get<Post[]>('http://localhost:8081/getallpost')
      return this.client.get<Post[]>('https://beta-fjord-21094.herokuapp.com/getallpost')
    }


    bringPostByID(id:string){
   //  return this.client.get<Post>('http://localhost:8081/getpostbyid/'+ id)
      return this.client.get<Post>('https://beta-fjord-21094.herokuapp.com/getpostbyid/'+ id)

    }

  createPost(command:createPost, token:string):Observable<Object>{
   //return this.client.post('http://localhost:8080/create/post',
   // command, this.httpOptions)
   return this.client.post('https://alpha-post-comment123987.herokuapp.com/create/post',
   command,
   {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  })}
   ).pipe(catchError(this.handleError<any>
    ('addComment')))
  }


  addComment(command:createComment, token:string):Observable<Object>{
   // return this.client.post('http://localhost:8080/add/comment',
    // command, this.httpOptions)
    return this.client.post('https://alpha-post-comment123987.herokuapp.com/add/comment',
   command,
   {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  })}
   ).pipe(catchError(this.handleError<any>
    ('addComment')))
  }

   loginMethod(command:any){

   // return this.client.post<any>('http://localhost:8080/auth/login',
    return this.client.post<any>('https://alpha-post-comment123987.herokuapp.com/auth/login',
     command, this.httpOptions).pipe(
      catchError(this.handleError<any>('login'))
    )
   }

   private handleError<T>(operation = 'operation', result?: T){
    return(error: any): Observable<T> => {
      console.log(error);
      return error
    }
   }
}
