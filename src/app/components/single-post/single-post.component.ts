import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { createComment } from '../../models/createComment';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

 post:Post | undefined;

 newContent:string = '';
 newAuthor:string = '';

  constructor(
    private route: ActivatedRoute,
    private request:RequestService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPost();

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
