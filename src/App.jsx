import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Banner from "./components/Banner";
import { useJsonQuery } from "./utilities/schedule";
import TermPage from "./components/TermPage";
import Dispatcher from "./components/Dispatcher";

const App = () => {
  const [schedule, isLoading, error] = useJsonQuery(
    "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"
  );

  if (isLoading) return <div className="alert alert-secondary">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error loading data: {error.message}</div>;

  return (
    <div className="App">
      <Banner title={schedule.title} />
      <Dispatcher schedule={schedule}/>
    </div>
  );
};

export default App;
