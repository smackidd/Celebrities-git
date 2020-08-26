let teams = [];

const addTeam = ({ teamName, room }) => {
  //console.log('teamName', teamName, 'room', room);
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

const addMember = ({ teamID, userID, name }) => {
  console.log('teamID', teamID, 'userID', userID, 'name', name);
  const member = {
    userID,
    user: name,
  };

  //if user belongs to other team, remove them from other team first.
  removeMember(userID);

  const index = teams.findIndex((team) => team.id == teamID);

  teams[index].members.push(member);
  console.log('teams with new member', teams);
  return teams;
};

const removeMember = (userID) => {
  for (let i = 0; i < teams.length; i++) {
    let userIndex = teams[i].members.findIndex(
      (member) => member.userID == userID
    );
    if (userIndex !== -1) return teams[i].members.splice(userIndex, 1)[0];
  }
};

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
