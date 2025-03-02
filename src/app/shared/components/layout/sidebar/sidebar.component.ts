import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule],
})
export class SidebarComponent implements OnInit {
  activeView = 1;
  showSideBar = true;

  constructor(private sidebarService: SidebarService, private router: Router) {
    this.sidebarService.sideBarObserver().subscribe((show) => {
      this.showSideBar = show;
    });
  }

  ngOnInit(): void {}

  changeView(view: number, router: string) {
    this.router.navigate([`/contacts/${router}/`]);
    this.activeView = view;

    this.verifyMobile();
  }

  verifyMobile() {
    if (window.innerWidth < 1024) this.sidebarService.toggleSideBar(false);
  }
}
