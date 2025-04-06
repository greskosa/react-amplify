import { useState } from 'react';
import './App.css';

import { RtkTodo } from './components/RtkTodo';
import { store } from './store/TodoRtkStore';
import { Provider } from 'react-redux';

import ReducerComponent from './components/ReducerComponent';
import { TodosProvider } from './components/TodosProvider';
import { TodosContextComponent } from './components/TodosContextComponent';
import { ZustandTodoComponent } from './components/ZustandTodoComponent';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className='container'>
        <div>
          <TodosProvider>
            <TodosContextComponent />
          </TodosProvider>
        </div>
        <div>
          <ReducerComponent />
        </div>
        <div>
          <Provider store={store}>
            <RtkTodo />
          </Provider>
        </div>
        <div>
          <ZustandTodoComponent />
        </div>
      </div>
      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
    </>
  );
}

export default App;
