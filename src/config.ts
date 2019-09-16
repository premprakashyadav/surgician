import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	public wordpressApiUrl = 'http://demo.titaniumtemplates.com/wordpress/?json=1';
}

export const firebaseConfig = {
	fire: {
		apiKey: "AIzaSyA8zrQLKoTXcVupO2JSJEFjLuHPGEWyRMM",
    authDomain: "surgician-latest.firebaseapp.com",
    databaseURL: "https://surgician-latest.firebaseio.com",
    projectId: "surgician-latest",
    storageBucket: "surgician-latest.appspot.com",
    messagingSenderId: "904466780282"
	}
};