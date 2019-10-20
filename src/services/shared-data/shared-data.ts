import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Base64 } from '@ionic-native/base64';

@Injectable()
export class SharedDataProvider {
  public userEmail;
  public imageLists: any[] = [];
  constructor(public network: Network,
    public camera: Camera,
    public crop: Crop,
    public imagePicker: ImagePicker,
    public photoViewer: PhotoViewer,
    private base64: Base64) {
    console.log('Hello SharedDataProvider Provider');
  }
  CheckInternet() {
    this.network.onConnect().subscribe(() => { });
  }

  openCamera(imglength) {
    this.imageLists = imglength ? imglength : [];
    const options: CameraOptions = {
      quality: 50,
      //allowEdit: true,
      targetWidth: 400,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    return this.camera.getPicture(options).then((imageData) => {
      this.imageLists.push(imageData);
      return this.imageLists;
    }, (err) => {
    });
  }


  openImagePicker(imglength) {
    this.imageLists = imglength ? imglength : [];
    const options: ImagePickerOptions = {
      quality: 75,
      width: 400,
      // height: 500,
      outputType: 1,
      maximumImagesCount: 4
    }
    return this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        if (results !== "OK")
          this.imageLists.push(results[i]);

      }
      return this.imageLists;
    }, (err) => {
      console.log("Error occurred while loading", err);
    });

  };


  //Crop Image
  cropImg(imgPath) {
    let returnPara = {};
    return this.crop.crop(imgPath).then(newImage => {
      return this.base64.encodeFile(newImage).then((base64Img: string) => {
        let a = base64Img.split(",");
        return a[1]
      });
    },
      error => {
        return this.base64.encodeFile(imgPath).then((base64Img) => {
          let a = base64Img.split(",");
          return a[1]
        });
      }
    );
  }

viewImages(imgUrl) {
    this.photoViewer.show(imgUrl);
  }
}
