import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

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






  constructor(
    private route:ActivatedRoute,
    private _quiz:QuizService,
    private cat:CategoryService,
    private router:Router
    ) { }

  qId=0;
 quiz: any;


  ngOnInit(): void {
this.qId =this.route.snapshot.params.quid;
// alert(this.qId);
this._quiz.getQuiz(this.qId).subscribe(
  (data)=>{
  this.quiz=data;
  },
  
    (error)=>
    {
      console.log(error);

    }
  

);

this.cat.categories().subscribe(
  (data:any)=>{
    this.categories=data;
  },
  
    (error)=>{
      Swal.fire('Error','Error','error');
    }
  
);


  }


  //update form submit
     updateData(){
   //valiodating
   this._quiz.updateQuiz(this.quiz).subscribe(
     (data: any)=>{
Swal.fire('Updated','Successfully Updated','success').then((e)=>{
 this.router.navigate(['/admin/quizzes']);
});

     },
     (error: any)=>{
       Swal.fire('Error','error','error');
     }
   );
  }

}
