import { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // VITE_CODESPACE_NAME must be defined (see .env.local) to reach the Codespaces-forwarded API
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setTeams(Array.isArray(data) ? data : data.results || []))
      .catch((error) => console.error('Error fetching teams:', error));
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id || team.id}>
              <td>{team.name}</td>
              <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
