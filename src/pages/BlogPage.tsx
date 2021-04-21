import React, { FC, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native';
import moment from 'moment';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Layout, TopNavigation, Text, Icon, IconProps } from "@ui-kitten/components"
import SpinnerImage from 'src/components/SpinnerImage';
import { Blog } from '../types/blog';
import ProgressText from '../components/ProgressText';
import { scheduleNotification } from '../helpers/notifications';
import { SharedElement } from 'react-navigation-shared-element';

const BlogPage: FC = () => {
  const route = useRoute()
  const navigation = useNavigation();
  const params = route.params as any;
  const {title, author, imageUrl, datePublished, views, content, id }: Blog = params.blog as any;
  const progress: number = params.progress as any;
  const date = moment(datePublished);
  const [blogProgress, setBlogProgress] = useState(progress || 0)
  const shouldNotify = blogProgress < 0.7;

  useEffect(() => {
    return () => {
      navigation.addListener('beforeRemove', (e) => {
        if (!shouldNotify) {
          return
        }
        e.preventDefault();
        console.log(`progress: ${blogProgress}`);
        
        scheduleNotification({
          title: 'Continue Reading',
          body: `Continue reading ${title}`,
          data: {
            blog: params.blog,
            progress: blogProgress
          }
        }).then(() => {
          navigation.dispatch(e.data.action);
        })
      })
    }
  }, [navigation, shouldNotify])

  const InfoItem = ({iconName, text}: {iconName: string, text: string}) => (
    <Layout level='2' style={styles.infoItem}>
      <Icon name={iconName} fill='#8F9BB3' style={styles.infoIcon} />
      <Text status='info' style={styles.infoText} category='h6'>{text}</Text>
    </Layout>
  )
  
  return (
    <Layout level='2' style={{flex: 1}}>
        <SharedElement id={`blog.${id}.header`}>
          <TopNavigation
            alignment='center'
            title={evaProps => <Text {...evaProps} style={styles.headerText} >{title}</Text>}
            subtitle={evaProps => <Text {...evaProps} style={styles.headerText} category="s2" appearance="hint">{`By ${author}`}</Text>}
          />
        </SharedElement>
        <SharedElement id={`blog.${id}.photo`}>
          <SpinnerImage
            style={styles.image}
            source={{uri: imageUrl}}
          />
        </SharedElement>
      
        <SharedElement id={`blog.${id}.info`}>
          <Layout level='2' style={styles.blogInfo}>
            <InfoItem iconName="clock" text={`${date.format('Do MMMM, YYYY')}`}/>
            <InfoItem iconName="eye" text={`${views}`}/>
          </Layout>
        </SharedElement>

          <SharedElement id={`blog.${id}.text`} style={{flex: 1}}>
            <Layout level='2' style={{flex: 1}}>
              <ProgressText updateProgress={setBlogProgress} progress={blogProgress}>
                {content}
              </ProgressText>
            </Layout>
          </SharedElement>
    </Layout>
  )
}

export default BlogPage;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 320
  },
  headerText: {
    textTransform: 'capitalize'
  },
  blogInfo: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  infoIcon: {
    width: 32,
    height: 32,
    marginBottom: 6
  },
  infoItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoText: {
    textAlign: 'center'
  }
})