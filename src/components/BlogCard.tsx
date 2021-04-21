import React, { FC, useState, useEffect } from "react";
import {StyleSheet} from 'react-native';
import { Layout, Icon, Card, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { Blog } from "src/types/blog";
import SpinnerImage from 'src/components/SpinnerImage';
import { useNavigation } from '@react-navigation/native';
import { routes } from 'src/types/routes';
import { View as MotiView, AnimatePresence } from 'moti'
import { SharedElement } from 'react-navigation-shared-element';

const BlogCard: FC<Blog> = (props) => {
  const [mount, setMount] = useState(true)
  useEffect(() => {
    setMount(true)
    return () => {
      setMount(false)
    }
  }, []);
  const navigation = useNavigation();
  const navigateToFullBlog = () => {
    navigation.navigate(routes.BLOG, {blog: props});
  }
  const {title, author, imageUrl, datePublished, views, content, id} = props;
  const Header = () => (
    <SharedElement id={`blog.${id}.header`}>
      <Layout level='2' style={styles.header}>
        <Text category='h4' style={styles.headerText}>{title}</Text>
        <Text category='s1' style={styles.headerText}>{`Written by ${author}`}</Text>
      </Layout>
    </SharedElement>
  )

  const Footer = () => (
    <SharedElement id={`blog.${id}.info`}>
      <Layout style={styles.footer} level='2'>
        <View style={styles.footerDetail}>
          <Icon fill='#8F9BB3' style={styles.footerIcon} name='clock-outline'/>
          <Text>{datePublished.split('T')[0]}</Text>
        </View>
        <View style={styles.footerDetail}>
          <Icon fill='#8F9BB3' style={styles.footerIcon} name='eye-outline'/>
          <Text>{views}</Text>
        </View>
      </Layout>
    </SharedElement>
  )
  
  return (
    <Card header={Header} footer={Footer} onPress={navigateToFullBlog} style={{marginVertical: 20}}>
      <AnimatePresence>
      { mount &&
        <MotiView 
          from={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
          style={styles.container}
        >
          <SharedElement id={`blog.${id}.photo`}>
            <SpinnerImage
              style={{
                width: '100%',
                height: '82%'
              }}
              source={{uri: imageUrl}}
            />
          </SharedElement>
          <SharedElement id={`blog.${id}.text`}>
            <Text category='p1' numberOfLines={3} ellipsizeMode='tail' style={styles.content} >
              {content}
            </Text>
            <Text category='label' status='primary'>
              Continue reading
            </Text>
          </SharedElement>
        </MotiView>
      }
      </AnimatePresence>
    </Card>
  )
}

export default BlogCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
  },
  headerText: {
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  header: {
    padding: 10
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 10
  },
  footerDetail:{
    flexDirection: 'column',
    alignItems: 'center'
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 6
  },
  content: {
    lineHeight: 20
  }
})