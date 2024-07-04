import ReactDOM from 'react-dom';
import Generator from './components/Generator';
import './styles.css';

const App = () => {
  return (
    <>
      <Generator />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('index'));
