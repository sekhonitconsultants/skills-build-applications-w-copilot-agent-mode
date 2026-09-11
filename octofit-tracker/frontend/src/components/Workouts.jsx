import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // VITE_CODESPACE_NAME must be defined (see .env.local) to reach the Codespaces-forwarded API
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setWorkouts(Array.isArray(data) ? data : data.results || []))
      .catch((error) => console.error('Error fetching workouts:', error));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id || workout.id}>
              <td>{workout.name}</td>
              <td>{workout.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;
