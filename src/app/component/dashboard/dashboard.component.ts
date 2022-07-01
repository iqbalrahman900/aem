// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;
  userList: any;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.generateData();
      setInterval(() => this.generateData(), 3000);
    }, 1000);
  }
 

  async generateData() {
    let response = await this.authService.getServerList().toPromise();
    this.data = response;
    this.userList = response.tableUsers  
  }

  logout() {
    this.authService.logout();
  }
}
