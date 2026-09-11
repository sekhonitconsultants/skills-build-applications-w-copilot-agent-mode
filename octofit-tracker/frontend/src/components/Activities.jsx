import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // VITE_CODESPACE_NAME must be defined (see .env.local) to reach the Codespaces-forwarded API
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setActivities(Array.isArray(data) ? data : data.results || []))
      .catch((error) => console.error('Error fetching activities:', error));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id || activity.id}>
              <td>{activity.type}</td>
              <td>{activity.durationMinutes ?? activity.duration}</td>
              <td>{activity.date ? new Date(activity.date).toLocaleDateString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
