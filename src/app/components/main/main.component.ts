import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Post } from '../../models/post';
import { createPost } from '../../models/createPost';
import { Observable } from 'rxjs';
import {WebsocketService} from '../../services/websocket.service'
import { WebSocketSubject } from 'rxjs/webSocket';
import { StateService } from 'src/app/services/state/state.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts?:Post[];
  newTittle:string = '';
  newAuthor:string = '';

  availableState:any;

  socketManage?:WebSocketSubject<Post>;
  constructor(private request:RequestService,
    private state:StateService,
    private router:Router,
    private websocket:WebsocketService) { }

  ngOnInit(): void {
    if(this.validateLogin()){
      this. bringPosts();
      this.connectToMainSocket();
    }

  }

  validateLogin():boolean{
let validationResult = false;
this.state.state.subscribe(currentState =>
  {

    this.availableState = currentState;
    if(!currentState.logedIn){

      this.router.navigateByUrl('/login')
      validationResult = false;
      return
    }
    validationResult = true;
  })

return validationResult;

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
    this.playSoundnewmessage()
  }

  playSoundnewmessage() {
    const audio = new Audio();
    audio.src = '../../../assets/sounds/dbz-teleport.mp3';
    audio.load();
    audio.play();
  }

  submitPost(){
    if(this.newTittle != '' && this.newAuthor != ''){
    const newCommand:createPost = {
    postId: Math.floor(Math.random() * 100000).toString(),
    title: this.newTittle,
    author: this.newAuthor
    }

    this.sendsubmit(newCommand)

    this.newTittle= ''
    this.newAuthor = ''
  }
  }

  sendsubmit(command:createPost){
    this.request.createPost(command,
      this.availableState.token).subscribe()
  }





}
