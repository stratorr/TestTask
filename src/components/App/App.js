import Header from "../Header/Header";
import Skills from "../Skills/Skills";
import Users from "../Users/Users";
import SignUpForm from "../SignUpForm/SignUpForm";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Skills />
      <Users />
      <SignUpForm />
    </div>
  );
}

export default App;
