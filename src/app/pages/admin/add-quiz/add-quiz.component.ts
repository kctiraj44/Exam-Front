import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[
    {
      cid:'',
      title:''
    },

  ];
  


  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:'',
    category:{
      cid:''
    }

  };

  constructor(private cat:CategoryService, private snack :MatSnackBar,private quiz :QuizService) { }

  ngOnInit(): void {
this.cat.categories().subscribe(
  (data:any)=>{
    this.categories=data;

  },
  (error)=>{
  Swal.fire('Error!!','Error in loading data from server','error');
  }
);
  }
  




  addQuiz(){
    if(this.quizData.title.trim() =='' || this.quizData.title =='apple')
    {
   this.snack.open("Title Required",'',{
     duration:3000
   });
   return;
    }


    //call server
    this.quiz.addQuiz(this.quizData).subscribe(
      (data)=>{
        this. quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:'',
          category:{
            cid:''
          }
      
        };
      Swal.fire('Success','Quiz has been successfully added','success');
     
      

      },
      (error)=>{
        console.log(error);
        Swal.fire('error','Invalid credentials','error');
      }

      
    );
    

  }
}