import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public quizzess(){
    return this.http.get(`${baseUrl}/quiz/`);
  }

  //add quiz

  public  addQuiz(quiz:any)
  {
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  //delete quiz
  public deleteQuiz(quid: any){
    return this.http.delete(`${baseUrl}/quiz/${quid}`);

  }

  //get single quiz
  public getQuiz(quid: any){
    return this.http.get(`${baseUrl}/quiz/${quid}`);
  }

  //update quiz
  public updateQuiz(quiz: any){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }


  //quiz quizzes of category

  public getQuizzesOfcatgory(cid: any){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }


  //get active quizzess
  public getActiveQuizzes(){
    return  this.http.get(`${baseUrl}/quiz/active`);
  }


  //get active quizzes of category
  public getActiveQuizzesOfCategory(cid: any){
  return  this.http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
}
