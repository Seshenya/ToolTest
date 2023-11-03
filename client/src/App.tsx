import { BrowserRouter } from 'react-router-dom';
import AppLayout from '@gdsdt4/core/AppLayout';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;