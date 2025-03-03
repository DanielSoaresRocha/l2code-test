import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InputFocusDirective } from '../../../../shared/directives';

@Component({
  selector: 'app-enter',
  imports: [RouterModule, InputFocusDirective],
  templateUrl: './enter.component.html',
  styleUrl: './enter.component.scss',
})
export class EnterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  login() {
    localStorage.setItem('token', 'Bearer .......');
    this.router.navigate(['contacts/register']);
  }
}
