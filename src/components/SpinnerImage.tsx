import React, { useState } from 'react';
import Image from 'react-native-image-progress';
import { Skeleton } from '@motify/skeleton'

const SpinnerImage = (props: any) => {
  const [loading, setLoading] = useState(true)
  const onLoad = () => {
    setLoading(false);
  }
  return (
    <Skeleton show={loading}>
      <Image
        {...props}
        onLoad={onLoad}
      />
    </Skeleton>
  )
}
export default SpinnerImage;