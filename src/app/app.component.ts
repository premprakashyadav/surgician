import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestServiceProvider } from '../services/rest-service/rest-service';
import { config } from '../shared/config';
import { ToastProvider } from '../services/toast/toast';
import { Network } from '@ionic-native/network';
import { AlertProvider } from '../services/alert/alert';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  public loaderShow: boolean = false;
  pages: Array<{ title: string, component: any }>;
  profileImg; profileName
  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public restServiceProvider: RestServiceProvider,
    public toastProvider: ToastProvider,
    public network: Network,
    public alertProvider: AlertProvider,
    public keyboard: Keyboard,
    private androidPermissions: AndroidPermissions) {
    this.initializeApp();


    if (localStorage.getItem("isLogin") == "Yes") {
      // this.nav.setRoot('DashboardPage');
      this.rootPage = 'LoggedinPage';
    }
    else {
      //  this.nav.setRoot('LoginPage');
      this.rootPage = 'HomePage';
    }
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Forgot Password', component: 'ForgotpasswordPage' },
      { title: 'Login', component: 'LoginPage' },
      { title: 'Register', component: 'RegisterPage' },
      { title: 'Upload Prescription', component: 'UploadprescriptionPage' },
      { title: 'Home Service', component: 'HomeservicePage' },
      { title: 'Visitors', component: 'VisitorsPage' },
      { title: 'Any Other', component: 'AnyotherPage' },
      { title: 'Healthcheck', component: 'HealthcheckPage' },
      { title: 'Doctor', component: 'DoctorPage' },
      { title: 'Home Healthcare', component: 'HomehealthcarePage' },
      { title: 'Request Call', component: 'RequestcallPage' },
      { title: 'Second Openion', component: 'SecondopenionPage' },
      { title: 'Online Appointment', component: 'OnlineappointmentPage' },
      { title: 'Partner', component: 'PartnerPage' },
      { title: 'Hospital', component: 'HospitalPage' },
      { title: 'User', component: 'UserPage' },
      { title: 'OTP', component: 'OtpPage' }

    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      //   this.keyboard.onKeyboardShow().subscribe(() => {
      //     document.body.classList.add('keyboard-is-open');
      // });
      // this.keyboard.onKeyboardHide().subscribe(() => {
      //     document.body.classList.remove('keyboard-is-open');
      // });
      this.statusBar.backgroundColorByHexString('#9e9e9e');
      this.splashScreen.hide();
      if (localStorage.getItem("isLogin") == "Yes") {
        this.getUserInfo();
      }

      
      this.androidPermissions.requestPermissions(
        [
          this.androidPermissions.PERMISSION.CAMERA,
          this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
        ]
      );


    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if (page.title == "Logout") {
      localStorage.removeItem("isLogin");
      this.nav.setRoot(page.component);
    }
    else if (page.title == "Home") {
      this.nav.setRoot(page.component);

    }
    else {
      this.nav.push(page.component);
    }

  }

  getUserInfo() {
    if (this.network.type === 'none') {
      this.alertProvider.showWithTitle('No Internet Connection', 'Please connect internet to start')
      if (localStorage.getItem("profileData")) {
        let a = JSON.parse(localStorage.getItem("profileData"))
        this.restServiceProvider['profileData'] = a;
        this.restServiceProvider.profileName = a.name;
        this.restServiceProvider.profileImg = a.image;
      }
    }
    else {
      this.loaderShow = true;
      let myId = localStorage.getItem('userID');
      this.restServiceProvider.getService(config['userinfo'] + '/' + myId).subscribe(result => {
        this.loaderShow = false;
        if (result.Response.status == 'success') {
          console.log(result.Data)
          localStorage.setItem("profileData", JSON.stringify(result.Data))
          this.restServiceProvider['profileData'] = result.Data;
          this.restServiceProvider.profileName = result.Data.name;
          this.restServiceProvider.profileImg = result.Data.image;

        }
        else {
        }
      }, (err) => {
        this.toastProvider.presentToastTop(err)
      });
    }
  }

  errorPic() {
    this.profileImg = "assets/imgs/profile_photo.png";
  }
  goProfile() {
    this.nav.push("ProfilePage")
  }

}
