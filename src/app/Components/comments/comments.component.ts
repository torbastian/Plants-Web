import { Component, OnInit, Input } from '@angular/core';
import { CommentObj } from '../../models/comment-model';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() ArticleID: number;

  comments: CommentObj[] = [];

  constructor(
    private CommentService: CommentService
  ) { }

  ngOnInit(): void {
    if (this.ArticleID != undefined) {
      this.getComments();
    }
  }

  getComments() {
    this.CommentService.getByArticleId(this.ArticleID).subscribe(
      data => {
        this.comments = <CommentObj[]>data;
      },
      err => console.error(err)
    )
  }
}
