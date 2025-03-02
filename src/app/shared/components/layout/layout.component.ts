import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar';
import { SidebarComponent } from './sidebar';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [RouterModule, NavbarComponent, SidebarComponent],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
