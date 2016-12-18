import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Http, Response, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class GetTodosService {
  private todoUrl = '/todo';

  constructor(private http: Http) {
  }

  getTodos(): Observable<any> {
    return this.http.get(this.todoUrl);
  }

  addTodos(text): Observable<any> {
    let headers = new Headers({'Content-Type': "application/json;charset=UTF-8"});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({text});
    return this.http.post(this.todoUrl, body, options);
  }

  deleteTodos(id) {
    let headers = new Headers({'Content-Type': "application/json;charset=UTF-8"});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({id});
    return this.http.post('/todo/' + id, body, options);
  }

  updateTodo(id, completed) {
    let headers = new Headers({'Content-Type': "application/json;charset=UTF-8"});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({id, completed});
    return this.http.patch('/todo/' + id, body, options);
  }
}
