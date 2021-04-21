import React, { useEffect } from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import LoginPage from 'src/pages/LoginPage';
import HomePage from 'src/pages/HomePage';
import BlogPage from 'src/pages/BlogPage';
import { routes } from '../types/routes';
import { askPermissions } from '../helpers/notifications';

const Stack = createSharedElementStackNavigator();
const RootNavigator = () => {
  useEffect(() => {
    askPermissions();
  },[])
  return (
    <Stack.Navigator initialRouteName={routes.LOGIN} headerMode='none'>
      <Stack.Screen name={routes.LOGIN} component={LoginPage} options={{header: () => null}}/>
      <Stack.Screen name={routes.HOME} component={HomePage}/>
      <Stack.Screen 
        name={routes.BLOG} 
        component={BlogPage}
        sharedElementsConfig={(route) => {
          const { id } = route.params.blog;
          return [
            {
              id:`blog.${id}.header`,
              animation: 'fade' 
            },
            {
              id: `blog.${id}.info`,
              animation: 'fade'
            },
            {
              id: `blog.${id}.photo`, 
              animation: 'move'},
            {  
              id:`blog.${id}.text`,
              animation: 'move' 
            },
          ];
        }}
      />
    </Stack.Navigator>
  )
}

export default RootNavigator;