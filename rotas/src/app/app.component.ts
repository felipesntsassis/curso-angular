import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/auth.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app works!';
  mostrarMenu: Boolean = false;

  constructor(private authService: AuthService) {  }

  ngOnInit() {
    this.authService.mostrarMenuEmmiter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }
}
