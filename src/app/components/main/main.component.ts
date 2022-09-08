import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Post } from '../../models/post';
import { createPost } from '../../models/createPost';
import { Observable } from 'rxjs';
import {WebsocketService} from '../../services/websocket.service'
import { WebSocketSubject } from 'rxjs/webSocket';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts?:Post[];
  newTittle:string = '';
  newAuthor:string = '';

  socketManage?:WebSocketSubject<Post>;
  constructor(private request:RequestService, private websocket:WebsocketService) { }

  ngOnInit(): void {
    this. bringPosts();
    this.connectToMainSocket();
  }

  bringPosts(){
    this.request.bringAllpost().subscribe(posts =>
     {
      this.posts = posts} )
  }

  connectToMainSocket(){
    this.socketManage = this.websocket.websocketgeneral()
    this.socketManage.subscribe((message) => {
      this.insertPost(message)
    } )
  }

  insertPost(post:Post){
    this.newTittle= ''
    this.newAuthor = ''
    this.posts?.unshift(post)
  }

  submitPost(){
    const newCommand:createPost = {
    postId: Math.floor(Math.random() * 100000).toString(),
    title: this.newTittle,
    author: this.newAuthor
    }

    this.request.createPost(newCommand).subscribe()
    this.newTittle= ''
    this.newAuthor = ''

  }







}
