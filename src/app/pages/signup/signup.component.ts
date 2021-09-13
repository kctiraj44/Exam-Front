import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private  userService :UserService,private snack :MatSnackBar) { }

  public user ={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',


  };

  ngOnInit(): void {}



  formSubmit(){
 console.log(this.user);
 if(this.user.username == '' || this.user.username== null){
   this.snack.open("Username is Required!!!!",'',{
     duration:3000,
     
     
   });
   return ;
 }
 
 this.userService.addUser(this.user).subscribe(
   (data:any) => {
     console.log(data);
     Swal.fire('Success',data.id+':: User has been SuccessFully registered','success');


   },
   (error) => {

    console.log(error);
    this.snack.open('!!!!!Something went Wrong!!!!','',{
      duration:3000
    })

   }
 );



  }

}
