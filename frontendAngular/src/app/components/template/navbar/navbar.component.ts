import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public loggedIn: boolean;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.authStatus.subscribe(value => this.loggedIn = value);
  }

}
