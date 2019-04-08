import {Quest} from "../quests/quest.model";
import {User} from "../users/user.model";

export const USERS: User[] = [
  {
    id: 1,
    createdAt: 123,
    firstName: 'Daniel',
    lastName: 'Admin',
    nickName: 'Emperor',
    email: 'GDPR',
    questsCreated: [],
  },
  {
    id: 2,
    createdAt: 323,
    firstName: 'Jack',
    lastName: 'User',
    nickName: 'Sw0rdsm4n',
    email: 'jackiejam@citromail.hu',
    questsTaken: [],
  },
];

export const QUESTS: Quest[] = [
  {
    id: 1,
    createdAt: 123,
    deadline: 1234,
    description: 'smh',
    name: 'do it',
    type: 'action',
    creator: USERS[0],
    participants: [USERS[1]],
  },
  {
    id: 2,
    createdAt: 2123,
    description: 'smh else',
    name: 'just do it',
    type: 'action',
    creator: USERS[1],
  },
];

USERS[0].questsCreated.push(QUESTS[0]);
USERS[1].questsTaken.push(QUESTS[0]);
