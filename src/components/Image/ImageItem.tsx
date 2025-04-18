import { StyleSheet, Text, View, Image as RNImage, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

type ImageItemProps = {
  id: number;
  url: string;
};

const ImageItem = ({ id, url }: ImageItemProps) => {
  const [loading, setLoading] = useState(true); 

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loader}
        />
      )}
      <RNImage
        source={{ uri: url }}
        style={[styles.image, loading && { opacity: 0 }]} 
        onLoad={() => setLoading(false)} 
      />
    </View>
  );
};

export default ImageItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  loader: {
    position: 'absolute',
  },
  image: {
    width: 400,
    height: 400,
    borderRadius: 16,
  },
});
