import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { CommentType } from 'src/app/models/comment';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { createComment } from '../../models/createComment';
import {WebsocketService} from '../../services/websocket.service'
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

 post:Post | undefined;

 newContent:string = '';
 newAuthor:string = '';

 socketManage?:WebSocketSubject<CommentType>;

  constructor(
    private route: ActivatedRoute,
    private request:RequestService,
    private location: Location,
    private websocket:WebsocketService
  ) { }

  ngOnInit(): void {
    this.getPost();
this.connectToCommentSocket();
  }


  connectToCommentSocket(){
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.socketManage = this.websocket.websocketComment(id)
    this.socketManage.subscribe((message) => {
      this.insertComment(message)
    } )
    console.log(id)
  }

  insertComment(comment:CommentType){
    this.newContent= ''
    this.newAuthor = ''
    this.post?.comments.unshift(comment)
  }



  getPost(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.request.bringPostByID(id)
      .subscribe(post => this.post = post);
  }

  goBack(): void {
    this.location.back();
  }

  submitCommentt(){
    const newCommand:createComment = {
      commentId: Math.floor(Math.random() * 100000).toString(),
      postId: String(this.route.snapshot.paramMap.get('id')),
      author: this.newAuthor,
      content: this.newContent
    }

    this.request.addComment(newCommand).subscribe()
    this.newContent= ''
    this.newAuthor = ''

  }
}
