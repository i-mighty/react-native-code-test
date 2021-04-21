import React, { FC, useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { Text, Card, Layout, TopNavigation, Icon, Button } from "@ui-kitten/components";
import data from 'src/data/blogData.json'
import { Blog } from "../types/blog";
import BlogCard from "../components/BlogCard";
import { routes } from "../types/routes";
import LottieView from 'lottie-react-native';

const HomePage: FC = () => {
  const [page, setPage] = useState(0);
  const prev = () => {
    setPage(page-1);
  }
  const next = () => {
    setPage(page+1)
  }

  const blogs: Blog[] = data.blogs
  const navigation = useNavigation();
  const [notification, setNotification] = useState<any>();
  const [loading, setLoading] = useState(false)
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      navigation.navigate(routes.BLOG, {...data });
    });
  }, [])

  return (
      <Layout level='3' >
        {
          loading? (
            <LottieView source={require('../../assets/lottie/935-loading.json')} 
              autoPlay 
              loop 
              style={{
                flex: 1,
                width: '100%',
                height: '100%'
              }}
            />
          ): (
            <>
              <TopNavigation
                alignment='center'
                title={evaProps => <Text {...evaProps}>Home</Text>}
                subtitle={evaProps => <Text {...evaProps}>Post List</Text>}
              />
              <ScrollView style={styles.container}>
                {
                  blogs.slice((page*10), ((page+1)*10)).map((blog) => {
                    const index = blogs.indexOf(blog);
                    return <BlogCard {...{...blog, index}} key={`blog.${index}`}/>
                  })
                }
                <View style={styles.pagination}>
                  <Button disabled={page===0} onPress={prev}>Prev</Button>
                  <Button disabled={page >9} onPress={next}>Next</Button>
                </View>
              </ScrollView>
            </>
          )
        }
      </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  pagination: {
    marginBottom: 100,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default HomePage