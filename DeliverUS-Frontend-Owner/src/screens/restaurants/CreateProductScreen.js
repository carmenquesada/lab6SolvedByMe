import React, { useEffect, useState } from 'react'
import { Image, Platform, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import defaultProductImage from '../../../assets/product.jpeg'
import { getProductCategories, create } from '../../api/ProductEndpoints'
import { showMessage } from 'react-native-flash-message'
import DropDownPicker from 'react-native-dropdown-picker'
import * as yup from 'yup'
import { ErrorMessage, Formik } from 'formik'
import TextError from '../../components/TextError'

export default function CreateProductScreen ({ navigation, route }) {
  const initialProductValues = { name: null, description: null, price: null, image: null, order: null, productCategory: null, availability: true }
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])
  const pickImage = async (onSuccess) => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.canceled) {
      if (onSuccess) {
        onSuccess(result)
      }
    }
  }
  return (
    // Envolver el contenido con <Formik>:
    <Formik initialValues={initialProductValues}>
      {({ setFieldValue, values }) => (
    <ScrollView>
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: '60%' }}>
      <InputItem name='name' label='Name:' placeholder = 'Product name'/>
      <InputItem name='description' label='Description:' placeholder='Details about the product' />
      <InputItem name='price' label='Price:' placeholder='e.g. 5.99' keyboardType='numeric' />
      <InputItem name='order' label='Order:' placeholder='e.g. 1' keyboardType='numeric' />
      <InputItem name='productCategory' label='Product Category:' placeholder='e.g. Drinks, Pizza, Dessert' />
      <Pressable onPress={() => // ImagePicker: new pressable element. Once pressed, select an image
        pickImage(
          async result => {
            await setFieldValue('image', result)
          }
        )
      }
        style={styles.imagePicker}
      >
        <TextRegular>Image: </TextRegular>
        <Image style={styles.image} source={values.image ? { uri: values.logo.assets[0].uri } : productPlaceholder} />
      </Pressable>
      <Pressable
        onPress={() => console.log('Create product')
        }
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? GlobalStyles.brandPrimaryTap
              : GlobalStyles.brandPrimary
          },
          styles.button
        ]}>
        <TextRegular textStyle={styles.text}>
          Create product
        </TextRegular>
      </Pressable>
      </View>
    </View>
    </ScrollView>)}
 </Formik>
  )
}
const styles = StyleSheet.create({
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 40
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between'
  },
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: GlobalStyles.brandSecondary,
    textAlign: 'center'
  } })