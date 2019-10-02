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

  openCamera() {
    this.imageLists = [];
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    return this.camera.getPicture(options).then((imageData) => {
      // for (var i = 0; i < imageData.length; i++) {
      //   if (imageData[i] !== "O" || imageData[i] !== "K")
          this.imageLists.push(imageData);

     // }
      return this.imageLists;
    }, (err) => {
    });
  }

  // openImagePicker(){
  //   let options: ImagePickerOptions = { 
  //     quality: 100,
  //     width: 600,  
  //     height: 600, 
  //     outputType: 1, 
  //     maximumImagesCount: 15  
  // };  
  // this.imagePicker.getPictures(options).then((results) => {  
  //     for (let index = 0; index < results.length; index++) {  
  //         //here iam converting image data to base64 data and push a data to array value.  
  //         this.imageLists.push('data:image/jpeg;base64,' + results[index]);  
  //     }  
  //     console.log("Image Lists", this.imageLists);  
  // }, (error) => {  
  //     // Handle error   
  //     console.log("Error occurred while loading", error);  
  // }); 
  // }

  openImagePicker() {
    this.imageLists = [];
    const options: ImagePickerOptions = {
      quality: 75,
      width: 500,
      height: 500,
      outputType: 1,
      maximumImagesCount: 2
    }
    return this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        //this.imgPreview = results[i];
        // return this.base64.encodeFile(results[i]).then((base64File: string) => {
        //this.imageLists.push(base64File);
        // }, (err) => {
        //   console.log(err);
        //   return err;
        // });
        if (results[i] !== "O" || results[i] !== "K")
          this.imageLists.push(results[i]);

      }
      return this.imageLists;
      //console.log("Image Lists", this.imageLists); 
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


  viewImages(imgUrl) {
    this.photoViewer.show(imgUrl);
  }
}
