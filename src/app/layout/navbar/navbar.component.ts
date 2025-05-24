import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartPanelComponent } from '../../features/cart/cart-panel/cart-panel.component';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CartPanelComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(public router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}