import { AppRole } from './app-role.interface';

/**
 * ACL Type.
 */
interface AclType {
  [name: string]: (AppRole | '*')[];
}

/**
 * ACL Value.
 */
export const ACL: AclType = {
  home: ['*'],
  user: ['Administrator'],
  // post: ['*'],
  // 'add/post': ['Administrator'],
  // 'add/comment': ['Authenticated'],
  // admin: ['Administrator'],
};
