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
  CheckInternet(){
    this.network.onConnect().subscribe(() => {});
  }

  openCamera(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  return  this.camera.getPicture(options).then((imageData) => {
    
     return this.cropImg(imageData);
    }, (err) => {
    });
  }

  openImagePicker(){
    const options: ImagePickerOptions = {
      quality: 100,
      maximumImagesCount: 2,
      outputType: 0
    }
    var imagepick = this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          //this.imgPreview = results[i];
          return this.base64.encodeFile(results[i]).then((base64File: string) => {
            this.imageLists.push(base64File);
          }, (err) => {
            console.log(err);
            return err;
          });
      }
    }, (err) => { });
    return imagepick;
  
  };

  //Crop Image
cropImg(imgPath){
  let returnPara = {};
  return this.crop.crop(imgPath).then(newImage => {
    return  this.base64.encodeFile(newImage).then((base64Img: string) => {
      let a = base64Img.split(",");
      return  a[1]
        });
    },
    error =>{
      return  this.base64.encodeFile(imgPath).then((base64Img) => {
        let a = base64Img.split(",");
        return   a[1]
          });
    }
  );
}

// toBase64(url: string) {
//   return new Promise<string>(function (resolve) {
//       var xhr = new XMLHttpRequest();
//       xhr.responseType = 'blob';
//       xhr.onload = function () {
//           var reader = new FileReader();
//           reader.onloadend = function () {
//               resolve(reader.result);
//           }
//           reader.readAsDataURL(xhr.response);
//       };
//       xhr.open('GET', url);
//       xhr.send();
//   });
// }


viewImages(imgUrl){
  this.photoViewer.show(imgUrl);
}
}
