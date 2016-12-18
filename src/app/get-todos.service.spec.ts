/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetTodosService } from './get-todos.service';

describe('GetTodosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetTodosService]
    });
  });

  it('should ...', inject([GetTodosService], (service: GetTodosService) => {
    expect(service).toBeTruthy();
  }));
});
