import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonText,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  phonePortraitOutline,
  phonePortraitSharp,
  cameraOutline,
  cameraSharp,
  locationOutline,
  locationSharp,
} from 'ionicons/icons';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonIcon,
    IonText,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
  ],
})
export class WelcomePage implements OnInit {
  constructor() {
    addIcons({
      phonePortraitOutline,
      phonePortraitSharp,
      cameraOutline,
      cameraSharp,
      locationOutline,
      locationSharp,
    });
  }

  ngOnInit() {}
}
