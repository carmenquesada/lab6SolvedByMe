import React, { useEffect, useState } from 'react'
import { Image, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import DropDownPicker from 'react-native-dropdown-picker'
import { create, getRestaurantCategories } from '../../api/RestaurantEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import restaurantLogo from '../../../assets/restaurantLogo.jpeg' // Agregar un imagePicker (selector de imagen) al form
import restaurantBackground from '../../../assets/restaurantBackground.jpeg'
import { showMessage } from 'react-native-flash-message'
import { ErrorMessage, Formik } from 'formik'
import TextError from '../../components/TextError'

export default function CreateRestaurantScreen () {
  // Definir valores iniciales del form:
  const initialRestaurantValues = { name: null, description: null, address: null, postalCode: null, url: null, shippingCosts: null, email: null, phone: null, restaurantCategoryId: null}
  // ImagePicker: pedir permisos de acceso a la galería
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
  // ImagePicker: definir la función pickImage
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
    <Formik initialValues={initialRestaurantValues}>
      {({ setFieldValue, values }) => (
    // ScrollView nos permite desplazarnos hacia abajo, debe envolver todo el contenido:
    <ScrollView>
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: '60%' }}>
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <Pressable onPress={() => // ImagePicker: new pressable element. Once pressed, select an image
        pickImage(
          async result => {
            await setFieldValue('logo', result)
          }
        )
      }
        style={styles.imagePicker}
      >
        <TextRegular>Logo: </TextRegular>
        <Image style={styles.image} source={values.logo ? { uri: values.logo.assets[0].uri } : restaurantLogo} />
      </Pressable>
      <Pressable
        onPress={() => console.log('Button pressed')
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
          Create restaurant
        </TextRegular>
      </Pressable>
      </View>
    </View>
    </ScrollView>
      )}
 </Formik>
)
}

const styles = StyleSheet.create({
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
  },
  // Styling additions
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  }
})