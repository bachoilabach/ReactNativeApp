import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from '@/src/model/image.model';


import ImageItem from '@/src/components/Image/ImageItem';
import { getImages } from '@/src/services/image.services';

const Images = () => {
  const [images, setImages] = useState<Image[]>([]);
  const handleGetAllImages = async () => {
    const response = await getImages();
    setImages(response);
  };
  useEffect(() => {
    handleGetAllImages();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={images}
        renderItem={({ item }) => (
          <ImageItem id={item.id} url={item.url} />
        )}
      />
      {/* <ImageItem/> */}
    </View>
  );
};

export default Images;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
