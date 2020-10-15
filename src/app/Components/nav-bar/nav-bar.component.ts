import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.user.subscribe(user => {
      if (user != null || user != undefined) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  loggedIn: boolean = false;
  active: boolean = false;
}
