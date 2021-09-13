import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }


  //get questions
  public getQuestionsOfQuiz(quid: any){

    return this.http.get(`${baseUrl}/question/quiz/all/${quid}`);

  }

  public getQuestionsOfQuizForTest(quid: any){

    return this.http.get(`${baseUrl}/question/quiz/${quid}`);

  }





//add question
public addQuestion(question: any){

  return this.http.post(`${baseUrl}/question/`,question);
}

//delete questions
public deleteQuestion(questionId: any){

  return this.http.delete(`${baseUrl}/question/${questionId}`);
}

}
