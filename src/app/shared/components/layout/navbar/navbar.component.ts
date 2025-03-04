import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showSideBar = true;

  constructor(private sidebarService: SidebarService, private router: Router) {}

  ngOnInit(): void {
    this.sidebarService.sideBarObserver().subscribe((data) => {
      if (data.showSideBar != undefined) this.showSideBar = data.showSideBar;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSideBar({
      showSideBar: !this.showSideBar,
    });
  }

  logOut() {
    this.router.navigate([`/`]);
  }
}
