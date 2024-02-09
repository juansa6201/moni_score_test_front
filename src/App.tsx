// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import EditPersonForm from './components/EditPersonForm';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<PersonForm />} />
          <Route path="/list" element={<PersonList />} />
          <Route path="/edit/:id" element={<EditPersonForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;