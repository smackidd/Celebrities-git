let teams = [];

const addTeam = ({ teamName, room }) => {
  console.log('teamName', teamName, 'room', room);
  const existingTeam = teams.find(
    (team) => team.room === room && team.teamName === teamName
  );
  if (existingTeam) return { error: 'Team name is taken' };

  let newID = 1;
  if (teams.length > 0) newID = teams[teams.length - 1].id + 1;

  const newTeam = {
    id: newID,
    totalScore: 0,
    teamName,
    members: [],
    room,
  };

  teams.push(newTeam);
  return teams;
};

const addMember = ({}) => {};

const removeMember = ({}) => {};

const removeTeam = ({}) => {};

const getTeams = ({}) => {};

const getTeam = ({}) => {};

const getMemberInTeam = ({}) => {};

module.exports = {
  addTeam,
  addMember,
  removeMember,
  removeTeam,
  getTeams,
  getTeam,
  getMemberInTeam,
};
