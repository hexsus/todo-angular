import {Component, OnInit} from '@angular/core';
import {GetTodosService} from "../get-todos.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  private todos: any = [];
  private input: string;

  constructor(private getTodosService: GetTodosService) {
  }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.getTodosService.getTodos().subscribe(res => {
      this.todos = JSON.parse(res._body);
    });
  }

  addTodos() {
    this.getTodosService.addTodos(this.input).subscribe(res => {
      console.log(res);
      this.getTodos();
      this.input = '';
    });
  }

  deleteTodo(id) {
    this.getTodosService.deleteTodos(id).subscribe(res=>{
      console.log(res);
      this.getTodos();
    });
  }
  updateTodo(id, completed) {
    let completedTodo = !completed;
    console.log(completedTodo);
    this.getTodosService.updateTodo(id, completedTodo).subscribe(res=>{
      console.log(res);
      this.getTodos();
    })
  }
}
