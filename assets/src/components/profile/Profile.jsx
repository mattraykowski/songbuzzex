import React from 'react';
import { compose } from 'recompose';

const Profile = () => (
  <div>My profile</div>
);

export const ProfileContainer = compose()(Profile);
