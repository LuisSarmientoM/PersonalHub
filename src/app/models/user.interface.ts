export type Acl = { [key: string]: string[] };
export interface IUser {
  uid: string;
  name: string;
  email: string;
  acl: Acl;
}
/* 
  {
    user: ['user.read'],
    products: ['product.read', 'product.write'],
  }
*/
