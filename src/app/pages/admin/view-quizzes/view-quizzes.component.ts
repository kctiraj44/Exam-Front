import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
quizzess=[
  {
    quid:'',
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:'',
    category:{
      title:'',
    }

  },
];


  constructor(private quiz :QuizService) { }

  ngOnInit(): void {
    this.quiz.quizzess().subscribe(
      (data:any)=>{
    this.quizzess =data;
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','Eroor loading from server','error');
      }

    )
  }

  //delete quiz
  deleteQuiz(quid: any){
Swal.fire({
  icon:'info',
   title:'Are you sure ?',
   confirmButtonText:'Delete',
   showCancelButton:true,
}).then((result)=>{
  if(result.isConfirmed){
    this.quiz.deleteQuiz(quid).subscribe(
      (data)=>{
         this.quizzess = this.quizzess.filter((quiz)=>quiz.quid!=quid);
    Swal.fire('Success','Quiz has been Successfully deleted','success');
      },
      (error)=>{
        Swal.fire('error','Error in delteing quiz','error');
      }
      
    );
  }
})


    
  }

}
