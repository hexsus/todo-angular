import { TodoAngularAppPage } from './app.po';

describe('todo-angular-app App', function() {
  let page: TodoAngularAppPage;

  beforeEach(() => {
    page = new TodoAngularAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
