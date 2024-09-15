import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useRef } from 'react';

import LoginForm from './components/LoginForm';
import Home from './components/Home';
import SignInForm from './components/SignInForm';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
    </Router>
  );
}

export default App;
