import { Component, OnInit, Input } from '@angular/core';
import { CommentObj } from '../../models/comment-model';
import { CommentService } from '../../services/comment.service';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() ArticleID: number;

  comments: CommentObj[] = [];
  loggedIn: boolean = false;
  characterCount: number = 0;

  constructor(
    private CommentService: CommentService,
    private accountService: AccountService
  ) { }

  CommentForm = new FormGroup({
    CommentBox: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.CommentForm.valueChanges.subscribe(
      data => {
        this.characterCount = this.CommentForm.value.CommentBox.length;
      }
    )

    if (this.ArticleID != undefined) {
      this.getComments();
    }
  }

  checkUser() {
    //Check if the user is logged in
    if (this.accountService.userValue != null || this.accountService.userValue != undefined) {
      this.loggedIn = true;
    }
  }

  getComments() {
    /* Get all comments belonging to an article */
    this.CommentService.getByArticleId(this.ArticleID).subscribe(
      data => {
        this.comments = <CommentObj[]>data;
        this.comments.reverse();
      },
      err => console.error(err),
      () => this.checkUser()
    )
  }

  postComment() {
    //Check if the user is logged in or not, create a new comment obj
    //and send it for creation on the database
    let _user = this.accountService.userValue;

    if (_user == null) {
      return;
    }

    let _comment = new CommentObj();
    _comment.info = this.CommentForm.value.CommentBox;

    this.CommentService.postNewComment(_user.id, this.ArticleID, _comment).subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err),
      () => this.getComments()
    );

    //reset the form
    this.CommentForm.reset();
  }
}
