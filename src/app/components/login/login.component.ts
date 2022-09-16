import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StateService } from 'src/app/services/state/state.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,
    private router:Router,
    private state:StateService,
    private request:RequestService) { }

  ngOnInit(): void {
  }

  async asyncloginWithGoogle() {
    const response = await this.authService.logInWithGoogle()
    if(response){

      this.state.state.next({
        logedIn: true,
        authenticatedPerson: response,
        token: ''
      })

      this.request.loginMethod({
        username: response.user.email,
        password: response.user.email
      }).subscribe(
        {next: token => {
            console.log(token)
          if(token){
            this.state.state.next({
              logedIn: true,
              authenticatedPerson: response,
              token: token.access_token
            })
          }
      }

      })
      this.router.navigateByUrl('/main')

    }
  }

}
