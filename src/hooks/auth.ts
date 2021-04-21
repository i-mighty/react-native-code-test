import { useContext } from 'react';
import { Context } from '../containers/ContextProvider';

export const useAuth = () => {
  const {auth, updateUser} = useContext(Context)
  return [auth, updateUser];
}