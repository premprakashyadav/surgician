import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { RestServiceProvider } from '../../services/rest-service/rest-service';
import { config } from '../../shared/config';
import { ToastProvider } from '../../services/toast/toast';
import { Network } from '@ionic-native/network';
import { AlertProvider } from '../../services/alert/alert';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ActionSheetController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Port } from '../../types';


/**
 * Generated class for the HomeservicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homeservice',
  templateUrl: 'homeservice.html',
})
export class HomeservicePage {
  @ViewChild('myInput') myInput: ElementRef;
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  public message = '';
  public attachmentImg: any[];
  public loaderShow: boolean = false;
  public name = '';
  public address = '';
  public service = 'Home Visit';
  public checkup = '';
  public equipment = '';
  ports: Port[];
  port: Port;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restServiceProvider: RestServiceProvider,
    public toastProvider: ToastProvider,
    public network: Network,
    public alertProvider: AlertProvider,
    public sharedDataProvider: SharedDataProvider,
    public actionSheetCtrl: ActionSheetController, public nav: Nav
  ) {
    this.ports = [
      { name: "HEAMOGLOBIN" },
      { name: "C.B.C." },
      { name: "E.S.R." },
      { name: "MALARIA TEST (M.P.)" },
      { name: "BLOOD GROUP & RH FACTOR" },
      { name: "PLATELET COUNT" },
      { name: "G6PD" },
      { name: "SICKLING TEST" },
      { name: "PROTHROMBIN TIME/PTT" },
      { name: "BLEEDING & CLOTTING TIME" },
      { name: "BLOOD SUGAR FASTING" },
      { name: "BLOOD SUGAR POST LUNCH" },
      { name: "BLOOD SUGAR RANDOM" },
      { name: "G.T.T.(4 SAMPLE)" },
      { name: "BLOOD UREA" },
      { name: "BUN" },
      { name: "SERUM CREATININE" },
      { name: "SERUM ELECTROLYTE" },
      { name: "R.F.T." },
      { name: "TOTAL PROTEIN" },
      { name: "URIC ACID" },
      { name: "ALBUMINE/GLOBUMINE" },
      { name: "SERUM ELECTROLYTE" },
      { name: "ALKALINE PHOSPHATE" },
      { name: "S.G.O.T." },
      { name: "S.G.P.T." },
      { name: "BILIRUBINE" },
      { name: "L.F.T." },
      { name: "C.P.K.-MB" },
      { name: "C.P.K.-TOTAL" },
      { name: "CARDIAC PROFILE" },
      { name: "TOTAL CHOLESTEROL" },
      { name: "HDL CHOLESTEROL" },
      { name: "S.G.P.T." },
      { name: "TRIGLYCERIDE" },
      { name: "LIPID PROFILE" },
      { name: "G.G.T." },
      { name: "SERUM AMYLASE" },
      { name: "CALCIUM" },
      { name: "PHOSPHORUS" },
      { name: "MAGNESIUM" },
      { name: "IRON & TIBC" },
      { name: "R.A. TEST" },
      { name: "WIDAL TEST" },
      { name: "V.D.R.L. TEST" },
      { name: "SEMEN ANALYSIS" },
      { name: "HBsAG" },
      { name: "HIV" },
      { name: "HCV" },
      { name: "MANTOUX TEST" },
      { name: "COOMB TEST (DIRECT/INDIRECT)" },
      { name: "WESTERN BLOT TEST" },
      { name: "HLA B-27" },
      { name: "Beta HCG" },
      { name: "TROP T" },
      { name: "T.P.H.A." },
      { name: "T3.T4.TSH" },
      { name: "LH" },
      { name: "FSH" },
      { name: "PROLACTINE" },
      { name: "TOXOPLASMA" },
      { name: "A.S.O. TITRE" },
      { name: "C REACTIVE PROTEIN (CRP)" },
      { name: "SPUTUM A.F.B." },
      { name: "DENGUE IgM/ IgG" },
      { name: "DENGUE NS1" },
      { name: "LEPTOSPIRA IgG/ IgM" },
      { name: "MALERIA ANTIGEN" },
      { name: "IGM" },
      { name: "25-OH Vitamin D" },
      { name: "CA 15.3" },
      { name: "CA 19.9" },
      { name: "CA 125" },
      { name: "G6PD" },
      { name: "Hb1AC" },
      { name: "IRON" },
      { name: "VITAMIN B 12" },
      { name: "URINE ROUTINE" },
      { name: "URINE CULTURE & SENSITIVITY" },
      { name: "PREGNANCY TEST" },
      { name: "URINE SUGAR F/PP" },
      { name: "STOOL ROUTINE" },
      { name: "STOOL CULTURE & SENSITIVITY" },
      { name: "DIABETIC PROFILE" },
      { name: "HYPERTENSION PROFILE" },
      { name: "INFERTILITY PROFILE" },
      { name: "PREGNANCY PROFILE" },
      { name: "TROP I" },
      { name: "LIPOPROTEIN - A" },
      { name: "CRP - HS" },
      { name: "OTHERS" }
    ];
  }
  ionViewDidLoad() {
  }

  logout() {
    localStorage.clear();
    setTimeout(() =>
      this.nav.setRoot("LoginPage"),
      1000);
  }
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  presentActionSheet() {
    if (this.attachmentImg && this.attachmentImg.length > 8) {

      this.toastProvider.presentToastTop('More than 8 attachment are not allowed.');


    } else {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Modify your album',
        buttons: [
          {
            text: 'Upload from Library',
            handler: () => {
              this.openPicker()
            }
          }, {
            text: 'Camera',
            handler: () => {
              this.opemcam()
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }


  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.checkup = event.value;
    console.log('port:', event.value);
  };

  submitOrder() {
    if (this.address && this.checkup) {

      // if(!this.attachmentImg){
      //   this.toastProvider.presentToastTop("Attach one refrence image.");

      // }
      // else{
      let postData = {
        "userID": localStorage.getItem("userID"),
        "name": this.name,
        "message": this.message ? this.message : 'No Comment',
        "address": this.address,
        "service": this.service,
        "checkup": JSON.stringify(this.checkup),
        "equipment": this.equipment,
        "upload_files": this.attachmentImg ? this.attachmentImg : ""
      }
      if (this.network.type === 'none') {
        this.alertProvider.showWithTitle('No Internet Connection', 'Please connect internet to start')
      }
      else {
        this.loaderShow = true;
        this.restServiceProvider.postService(config['commmonForm'], postData).subscribe(result => {
          this.loaderShow = false;
          if (result.Response.status == 'success') {
            this.toastProvider.presentToastTop("Request submitted successfully.");
            this.message = '';
            this.name = '';
            this.address = '';
            this.checkup = '';
            this.equipment = '';
            this.portComponent.clear();
            this.attachmentImg = undefined;
          }
          else {
            this.toastProvider.presentToastTop(result.Error.error_msg);
          }
        }, (err) => {
          this.loaderShow = false;
          this.toastProvider.presentToastTop(err)
        });
      }
      //   }
    } else {
      this.toastProvider.presentToastTop("Please Fill the Mandatory Fields.");
    }
  }


  opemcam() {
    this.sharedDataProvider.openCamera(this.attachmentImg).then(data => {
      console.log("data", data);
      if (data && data.length > 0) {
        this.attachmentImg = data;
      }
    })
  }


  openPicker() {
    this.sharedDataProvider.openImagePicker(this.attachmentImg).then(data => {
      if (data && data.length > 0) {
        this.attachmentImg = data;
      }
    })
  }

  viewImg(i) {
    this.sharedDataProvider.viewImages('data:image/png;base64,' + i);
  }

  deleteImg(index) {
    this.attachmentImg.splice(index, 1);
  }

  ionViewDidLeave() {
    this.attachmentImg = null;
  }
}
