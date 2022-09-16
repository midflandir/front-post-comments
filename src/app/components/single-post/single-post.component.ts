import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { CommentType } from 'src/app/models/comment';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { createComment } from '../../models/createComment';
import {WebsocketService} from '../../services/websocket.service'
import { WebSocketSubject } from 'rxjs/webSocket';
import { StateService } from 'src/app/services/state/state.service';
import { Router } from '@angular/router';
import { AfterViewChecked, ElementRef, ViewChild} from '@angular/core'

@Component({
  selector: 'app-single-post',  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit /*, AfterViewChecked */{
 // @ViewChild('scrollMe') private myScrollContainer: ElementRef;
 post:Post | undefined;

 newContent:string = '';
 newAuthor:string = '';

 socketManage?:WebSocketSubject<CommentType>;

 availableState:any;
  constructor(

    private state:StateService,
    private route: ActivatedRoute,
    private request:RequestService,
    private location: Location,
      private router:Router,
    private websocket:WebsocketService
  ) { }

  ngOnInit(): void {
    this.validateLogin();
    this.getPost();
this.connectToCommentSocket();
//this.scrollToBottom();
  }
 /*   ngAfterViewChecked() {
        this.scrollToBottom();
    }*/

    /*scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }
    }*/

  validateLogin():boolean{
    let validationResult = false;
    this.state.state.subscribe(currentState =>
      {

        this.availableState = currentState;
        if(!currentState.logedIn){

          validationResult = false;
          return
        }
        validationResult = true;
      })
    return validationResult;

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
    this.post?.comments.push(comment)
    this.playSound();
    this.gotobotton();
  }

  gotobotton(){
    let ele = document.getElementsByClassName('commentscontainer');
    let eleArray = <Element[]>Array.prototype.slice.call(ele);
    eleArray.map( val => {
        val.scrollTop = val.scrollHeight + 100;

    });
   /* var element:HTMLDivElement;
    element = <HTMLDivElement>document.getElementsByClassName("commentscontainer")[0];
    element.scrollIntoView();
*/
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
    if(this.newContent != '' && this.newAuthor != ''){
    const newCommand:createComment = {
      commentId: Math.floor(Math.random() * 100000).toString(),
      postId: String(this.route.snapshot.paramMap.get('id')),
      author: this.newAuthor,
      content: this.newContent
    }


    this.request.addComment(newCommand, this.availableState.token).subscribe()

    this.newContent= ''
    this.newAuthor = ''
  }
  }

  playSound() {
    const audio = new Audio();
    audio.src = '../../../assets/sounds/anime-wow-sound-effect.mp3';
    audio.load();
    audio.play();
}

}
