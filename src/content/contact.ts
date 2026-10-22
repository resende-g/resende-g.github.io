import { profile, type ProfileLink } from './profile';

export interface Contact {
  /** Professional e-mail as published on the CV. Set to `null` to hide. */
  email: string | null;
  links: ProfileLink[];
}

export const contact: Contact = {
  email: 'gabrielalmeidaresende@proton.me',
  links: profile.links,
};
