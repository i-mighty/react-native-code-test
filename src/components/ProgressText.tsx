import React, { FC, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import {Bar as ProgressBar} from 'react-native-progress';

const ProgressText: FC<{children: string, updateProgress: (progress: number) => void, progress: number}> = ({children, progress, updateProgress}) => {
    const [scrollViewHeight, setScrollViewHeight] = useState(0)
    const [scrollViewContentHeight, setScrollViewContentHeight] = useState(0)
    const [completed, setCompleted] = useState(progress >= 1)
    const textScrollView = useRef<ScrollView>(null);

    useEffect(() => {
      scrollTo()
    }, [scrollViewContentHeight, scrollViewHeight])

    const scrollTo = () => {
      textScrollView.current?.scrollTo({
        x: 0,
        y: ( scrollViewContentHeight - scrollViewHeight )*progress
      })
    }
 
    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) =>{
        const position = Math.abs( event.nativeEvent.contentOffset.y / ( scrollViewContentHeight - scrollViewHeight ));

        if (progress >= 0.9999) {
          setCompleted(true)
        }

        !completed && updateProgress(position)
    }
    return(
        <View style = { styles.container }>
            <ScrollView 
              ref={textScrollView}
              contentContainerStyle = {{ paddingBottom: 40 }} 
              onContentSizeChange = {( _width, height ) => { setScrollViewContentHeight(height) }} 
              onScroll = { onScroll } 
              onLayout = {(event) => setScrollViewHeight( event.nativeEvent.layout.height )} 
              scrollEventThrottle = { 12 } 
            >
              <Text style = { styles.text }>
                {children}
              </Text>
            </ScrollView>
            <View style = { styles.progressView }>
              <ProgressBar
                progress={progress}
                style={{width: '100%'}}
                width={null}
                color='#fff'
                borderWidth={0}
              />
              <Text style = { styles.percentageText }> { Math.round( progress * 100 ) }% </Text>
            </View>
        
        </View>
    );
}

export default ProgressText
 
const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        height: '100%',
    },
 
    text:
    {
        fontSize: 21,
        color: '#000',
        padding: 20,
        textAlign: 'left'
    },
    
    progressView:
    {
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingLeft: 20,
      paddingRight: 50,
      backgroundColor: '#009688',
      height: 50,
    },

    percentageText:
    {
        position: 'absolute',
        right: 6,
        fontWeight: 'bold',
        color: 'white'
    },
});