import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData={

    username:'',
    password:'',
  };

  constructor(private snack :MatSnackBar, private login:LoginService) { }

  ngOnInit(): void {
  }

formSubmit(){
  console.log("*-------form submitted -----*");

  if(this.loginData.username.trim()=='' || this.loginData.username == null)
  {
  this.snack.open("Username is required!!!!",'',{
    duration:3000,
  });
  return;
  }

  if(this.loginData.password.trim()=='' || this.loginData.password == null)
  {
  this.snack.open("Password is required!!!!",'',{
    duration:3000,
  });
  return;
  }

  //request to server to generate data

  this.login.generateToken(this.loginData).subscribe(

    (data:any)=>{
      console.log("*---------------------Success-------------------------*");
      console.log(data);


      //login.....
      this.login.loginUser(data.token);

      this.login.getCurrentUser().subscribe(
       (user:any)=>{
         this.login.setUser(user);
         console.log("*------------------------------"+user+"-----------------------*");

 
         //redirect :Admin  admin dashbaoard
         //redirect : Normal normal dashboard
       if(this.login.getUserRole() == "ADMIN")
       {
          //admin dashbord
          window.location.href='/admin';
       }
       else if(this.login.getUserRole()== 'NORMAL'){
         //normak user dasboard
        window.location.href='/user-dashboard/0';
       }
       else{
         this.login.logout();
         
        
       }



       }

      );

    },
    (error)=>
    {
      console.log("*---------------------Error--------------------------*");
      console.log(error);
      this.snack.open("*-------Invalid Details !!  Try again ",'',{
        duration:3000
      });
    }
    );


}

}
