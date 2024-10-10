import { Request } from 'express';

import { User } from '../../database/models/User.entity';

export type RequestWithLoggedUser = Request & {
  loggedUser: User;
};
