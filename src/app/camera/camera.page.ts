import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Camera } from '@capacitor/camera';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonButton,
    IonButtons,
    IonBackButton,
  ],
})
export class CameraPage implements OnInit {
  protected photoTaken = '';

  constructor() {}

  ngOnInit() {}

  async takePhoto() {
    try {
      const result = await Camera.takePhoto({
        quality: 90,
        includeMetadata: true,
      });

      if (result.webPath) {
        this.photoTaken = result.webPath;
      }
    } catch (error: any) {
      const message = error.code
        ? `[${error.code}] ${error.message}`
        : error.message;
      console.error('takePhoto failed:', message);
    }
  }
}
