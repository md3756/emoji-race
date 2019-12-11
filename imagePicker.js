import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { firebase } from './firebase';

import store from './store'

export default class ImagePick extends React.Component {
    constructor(props) {
        super(props)
  
        this.state = {
          image: null, 
        }
      }

  render() {
    let { image } = this.state;

    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title="Pick an image from camera roll!"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    // console.log(result);

    if (!result.cancelled) {
        this.setState({ image: result.uri });
        console.log("PROPS ", this.state)
      this.props.store.state.dispatch("ADD_IMAGE", {img: this.state.image});
      console.log("HIHIHIHIHI ", this.props.store.state)
    }
  };
}