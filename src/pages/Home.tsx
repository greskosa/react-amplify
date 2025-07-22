import { Provider } from 'react-redux';
import ReducerComponent from '../components/ReducerComponent';
import { TodosContextComponent } from '../components/TodosContextComponent';
import { TodosProvider } from '../components/TodosProvider';
import { store } from '../store/TodoRtkStore';
import { RtkTodo } from '../components/RtkTodo';
import { ZustandTodoComponent } from '../components/ZustandTodoComponent';

const Home = () => {
  return (
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
  );
};

export default Home;
