import { Component, OnInit,Input } from '@angular/core';
import { CommentType } from 'src/app/models/comment';
@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() comment?:CommentType;
}
