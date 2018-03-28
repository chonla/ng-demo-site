import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave',
  templateUrl: './leave-page.component.html',
  styleUrls: ['./leave-page.component.css']
})
export class LeavePageComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  leave() {
    this.auth.leave()
      .then(() => {
        this.router.navigate(['/']);
      });
  }

}
