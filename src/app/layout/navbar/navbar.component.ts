import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartPanelComponent } from '../../features/cart/cart-panel/cart-panel.component';
import { CommonModule } from '@angular/common'; // <-- AÑADE ESTO

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CartPanelComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isCollapsed = true;

  constructor(public router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.isCollapsed = true; // cierra el menú después de navegar
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  
}