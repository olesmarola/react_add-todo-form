import React from 'react';
import cn from 'classnames';
import './App.scss';

import users from './api/users';
import todosData from './api/todos';
import NewTodo from './NewTodo';
import TodoTable from './TodoTable';

const getTodosWithUsers = (todoList, userList) => todoList.map(
  todo => (
    {
      ...todo,
      user: userList.find(user => user.id === todo.userId),
    }
  )
);

class App extends React.Component {
  state = {
    todos: getTodosWithUsers(todosData, users),
  };

  addTodo = prevState => this.setState(thisPrevState => ({
    todos: [
      ...thisPrevState.todos,
      {
        id: thisPrevState.todos.length + 1,
        title: prevState.inputValue,
        completed: 'false',
        user: users.find(user => user.id === prevState.selectedUser),
      },
    ],
  }));

  render() {
    const { todos } = this.state;

    return (
      <div className={cn('App')}>
        <h1 className={cn('App__title')}>
          List of todos
        </h1>
        <NewTodo
          users={users}
          addTodo={this.addTodo}
        />
        <TodoTable todos={todos} />
      </div>
    );
  }
}

export default App;