import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  currentUser;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this.auth.currentUser();
  }

}
