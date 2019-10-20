import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Nav } from 'ionic-angular';
import { RestServiceProvider } from '../../services/rest-service/rest-service';
import { config } from '../../shared/config';
import { ToastProvider } from '../../services/toast/toast';
import { Network } from '@ionic-native/network';
import { AlertProvider } from '../../services/alert/alert';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ActionSheetController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import * as $ from "jquery";
import { IonicSelectableComponent } from 'ionic-selectable';
import { Port } from '../../types';




@IonicPage()
@Component({
  selector: 'page-onlineappointment',
  templateUrl: 'onlineappointment.html',
})
export class OnlineappointmentPage {
  @ViewChild('myInput') myInput: ElementRef;
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  //myDate = new Date(new Date().getTime()).toISOString();
  myDate = moment().format();
  myTime = moment().format('LT');
  public Comment;
  public attachmentImg: any;
  public loaderShow: boolean = false;
  doctorsSound: String[];
  appointSound: String[];
  addressSound: String[];
  isdoctors = false;
  isappoint = false;
  isaddress = false;
  public name = '';
  public address = '';
  public service = 'Online Appointment';
  public checkup = '';
  public equipment = '';
  public patientMobile = '';
  ports: Port[];
  port: Port;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restServiceProvider: RestServiceProvider,
    public toastProvider: ToastProvider,
    public network: Network,
    public alertProvider: AlertProvider,
    public sharedDataProvider: SharedDataProvider,
    public actionSheetCtrl: ActionSheetController, public nav: Nav,
    private speechRecognition: SpeechRecognition,
    private plt: Platform, private cd: ChangeDetectorRef
  ) {
    this.ports = [
      { name: "Cardiologist" },
      { name: "Dentist" },
      { name: "Dermatologist" },
      { name: "Ear-Nose-Throat (ENT)" },
      { name: "General Physician" },
      { name: "General Surgeon" },
      { name: "Gynaecologist" },
      { name: "Ophthalmologist" },
      { name: "Orthopaedics" },
      { name: "Pediatrician" },
      { name: "Physiotherapist" },
      { name: "Aesthetic Medicine" },
      { name: "Aesthetic Surgeon" },
      { name: "Allergy/Immunologist" },
      { name: "Anatomy" },
      { name: "Andrology and Sexual Medicine" },
      { name: "Anesthesiologist" },
      { name: "Audiologist" },
      { name: "Aviation Medicine" },
      { name: "Bariatric Surgeron" },
      { name: "Bariatrics" },
      { name: "Blood Banking & Tranfusion Medicine" },
      { name: "Cardiothoracic Vascular Surgeon" },
      { name: "Cosmetic Physician" },
      { name: "Cosmetic/Plastic Surgeon" },
      { name: "Cosmetologist" },
      { name: "Critical Care Specialist" },
      { name: "Cosmetic/Plastic Surgeon" },
      { name: "Diabetic Foot Surgeon" },
      { name: "Diabetologist" },
      { name: "Dietitian/Nutritionist" },
      { name: "Embryologist" },
      { name: "Emergency Medicine" },
      { name: "Endocrine Surgeon" },
      { name: "Endocrinologist" },
      { name: "Epidemiologist" },
      { name: "Family Medicine" },
      { name: "Forensic Medicine" },
      { name: "Gastroenterologist" },
      { name: "Genetics" },
      { name: "Geriatrics" },
      { name: "HIV Specialist" },
      { name: "Hematologist" },
      { name: "IVF Speciality" },
      { name: "Infectious Disease Physician" },
      { name: "Internal Medicine" },
      { name: "Laparoscopic Surgeon" },
      { name: "Laser Medicine" },
      { name: "Liver Transplant Surgeon" },
      { name: "Microbiologist" },
      { name: "Mother and Child Care" },
      { name: "Multi Speciality" },
      { name: "Nephrologist" },
      { name: "Neurologist" },
      { name: "Neurosurgeon" },
      { name: "Nuclear Medicine Physician" },
      { name: "Obstetrics" },
      { name: "Occupational Therapist" },
      { name: "Oncologist" },
      { name: "Oncosurgeon" },
      { name: "Oral And Maxillofacial Surgeon" },
      { name: "Pain Management" },
      { name: "Palliative Medicine" },
      { name: "Pathologist" },
      { name: "Histopathologist" },
      { name: "Cytologist" },
      { name: "Pediatric Cardiologist" },
      { name: "Pediatric Neurology" },
      { name: "Pediatric Surgeon" },
      { name: "Pediatric Oncosurgeon" },
      { name: "Pediatric Oncophysician" },
      { name: "Pharmacologist" },
      { name: "Physiologist" },
      { name: "Podiatrist" },
      { name: "Preventive Medicine" },
      { name: "Proctologist" },
      { name: "Psychiatrist" },
      { name: "Psychologist" },
      { name: "Pulmonologist" },
      { name: "Radiologist" },
      { name: "Respiratory Medicine" },
      { name: "Rheumatologist" },
      { name: "Rheumatology and Clinical Immunologist" },
      { name: "Robotic Surgery" },
      { name: "Sexologist" },
      { name: "Somnologist" },
      { name: "Speech Therapist" },
      { name: "Spine Surgeon" },
      { name: "Spine and Pain Specialist" },
      { name: "Sports Medicine" },
      { name: "Super Speciality" },
      { name: "Spine and Pain SpecialistSurgical Gastroenterologist" },
      { name: "Surgical Oncologist" },
      { name: "Toxicologist" },
      { name: "Trichologist" },
      { name: "Urologist" },
      { name: "Vascular Surgeon" },
      { name: "Venereologist" },
      { name: "Veterinary" },
      { name: "Acupressure" },
      { name: "Alternative Medicine" },
      { name: "Ayurveda" },
      { name: "Ayush" },
      { name: "Homeopathy" },
      { name: "Integrative Medicine" },
      { name: "Siddha" },
      { name: "Unani" },
      { name: "Yoga & Ayurveda" },
      { name: "Yoga & Naturopathy" },
      { name: "Other Specialities" },
      { name: "Non-Invasive Conservative Cardiac Care" },
      { name: "Non-invasive Cardiologist" },
      { name: "BAMS Student" },
      { name: "BDS Student" },
      { name: "BHMS Student" },
      { name: "BOPT Student" },
      { name: "BPTh Student" },
      { name: "BUMS Student" },
      { name: "MBBS Student" },
      { name: "Undergraduate Student" },
      { name: "Veterinary Student" },
    ];
  }

  logout() {
    localStorage.clear();
    setTimeout(() =>
      this.nav.setRoot("LoginPage"),
      1000);
  }
  isIos() {
    return this.plt.is('ios');
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isdoctors = false;
      this.isappoint = false;
      this.isaddress = false;
    });
  }

  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }

  startDoctorListening() {
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.doctorsSound = matches;
      this.cd.detectChanges();
    });
    this.isdoctors = true;
  }

  startAppointListening() {
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.appointSound = matches;
      this.cd.detectChanges();
    });
    this.isappoint = true;
  }

  startAddressListening() {
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.addressSound = matches;
      this.cd.detectChanges();
    });
    this.isaddress = true;
  }

  ionViewDidLoad() {

    this.getPermission();
    console.log('ionViewDidLoad PlaceOrderPage');
    let getTime = $('.timeAppoint .datetime').attr('ng-reflect-model');
    $('.timeAppoint .datetime .datetime-placeholder').text(getTime);

  }
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  presentActionSheet() {
    if (this.attachmentImg && this.attachmentImg.length >= 8) {

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
    if (this.doctorsSound && this.checkup && this.patientMobile && this.appointSound && this.addressSound && this.myDate && this.myTime) {

      // if(!this.attachmentImg){
      //   this.toastProvider.presentToastTop("Attach one refrence image.");

      // }
      // else{
      let postData = {
        "userID": localStorage.getItem("userID"),
        "message": this.Comment ? this.Comment : 'No Comment',
        "doctor": this.doctorsSound,
        "address": this.addressSound,
        "appointment": this.appointSound,
        "service": this.service,
        "appointdate": moment(this.myDate).format('DD MMM YYYY'),
        "appointtime": this.myTime,
        "checkup": JSON.stringify(this.checkup),
        "patientMobile": this.patientMobile,
        "upload_files": this.attachmentImg ? this.attachmentImg : ""
      }
      if (this.network.type === 'none') {
        this.alertProvider.showWithTitle('No Internet Connection', 'Please connect internet to start')
      }
      else {
        this.loaderShow = true;
        this.restServiceProvider.postService(config['onlineAppoint'], postData).subscribe(result => {
          this.loaderShow = false;
          if (result.Response.status == 'success') {
            this.toastProvider.presentToastTop("Request submitted successfully.");
            this.Comment = '';
            this.doctorsSound = [];
            this.appointSound = [];
            this.addressSound = [];
            this.equipment = '';
            this.checkup = '';
            this.patientMobile = '';
            this.myDate = '',
            this.myTime = '';
            this.portComponent.clear();
            this.attachmentImg = undefined;
            $('.timeAppoint .datetime .datetime-placeholder').text('');
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
    }  else {
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
