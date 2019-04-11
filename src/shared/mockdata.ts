import {Quest} from "../quests/quest.model";
import {User} from "../users/models/user.model";
import {BankAccount} from "../users/models/bank-account.model";

export const USERS: User[] = [
  {
    id: 1,
    createdAt: '123',
    firstName: 'Daniel',
    lastName: 'Admin',
    nickName: 'Emperor',
    email: 'GDPR',
    questsCreated: [],
  },
  {
    id: 2,
    createdAt: '323',
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
    createdAt: '123',
    deadline: 1234,
    description: 'smh',
    name: 'do it',
    type: 'action',
    creator: USERS[0],
    participants: [USERS[1]],
  },
  {
    id: 2,
    createdAt: '2123',
    description: 'smh else',
    name: 'just do it',
    type: 'action',
    creator: USERS[1],
  },
];

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 1,
    name: 'Meine account',
    account: '1234-5678',
    createdAt: '1232213',
    owner: USERS[0],
  },
  {
    id: 2,
    account: '4234-2212',
    createdAt: '34234423',
    owner: USERS[1],
  },
];

USERS[0].questsCreated.push(QUESTS[0]);
USERS[1].questsTaken.push(QUESTS[0]);
