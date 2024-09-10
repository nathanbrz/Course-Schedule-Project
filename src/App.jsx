import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Banner from "./components/Banner";
import { useJsonQuery } from "./utilities/schedule";
import Dispatcher from "./components/Dispatcher";
import { useDbData } from "../firebase";

const App = () => {
  // const [schedule, isLoading, error] = useJsonQuery(
  //   "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"
  // );

  // if (isLoading) return <div className="alert alert-secondary">Loading...</div>;
  // if (error) return <div className="alert alert-danger">Error loading data: {error.message}</div>;

  const [data, error] = useDbData('/');

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div className="App">
      <Banner title={data.title} />
      <Dispatcher schedule={data}/>
    </div>
  );
};

export default App;
