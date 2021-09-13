import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {


  qid: any;
  questions:any;
  marksGot=0;
  correctAnswers=0;
  attempted=0;
  isSubmit=false;

  constructor(
private locationst:LocationStrategy,
private route:ActivatedRoute,
private _question:QuestionService

  ) { }

  ngOnInit(): void {

    this.preventBackButton();
    this.qid =this.route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
  }





  loadQuestions() {
   this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
     (data:any)=>{
       this.questions=data;
       this.questions.forEach((q:any) => {
         q['givenAnswer']='';
         
       });
       console.log(this.questions)
     },
     (error:any)=>{
       console.log(error);
       Swal.fire("Error","Error in loding","error");
     }
   )
  }





  preventBackButton(){
    history.pushState(null,  location.href);
    this.locationst.onPopState(()=>{
    history.pushState(null,location.href);
    });
  }



  submitQuiz(){
    Swal.fire({
      title: 'Do you want to Submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon:'info'
    }).then((e)=>{
      if(e.isConfirmed){
        //calculation

this.isSubmit=true;
        
        console.log(this.questions);
        this.questions.forEach((q:any) => {
          if(q.givenAnswer == q.answer){
            this.correctAnswers++;
              let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
              this.marksGot+=marksSingle;
          }
          if(q.givenAnswer.trim() != ''){
            this.attempted++;
          }
          
        });
        console.log("Correct Answers:"+this.correctAnswers);
          console.log("Marks Got:"+this.marksGot);
          console.log("Attempted questions:"+this.attempted);
          
      }
    })
  }
}
