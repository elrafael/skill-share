import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline, refreshOutline } from 'ionicons/icons';

interface WeatherView {
  temperature: number;
  windspeed: number;
  description: string;
  emoji: string;
}
interface OpenMeteoResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  };
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonIcon,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonSpinner,
    IonText,
    IonMenuButton,
  ],
})
export class WeatherPage implements OnInit {
  protected weather: WeatherView | null = null;
  protected error: string | null = null;
  protected coords: { lat: number; lon: number } | null = null;
  protected loading = false;

  constructor() {
    addIcons({
      locationOutline,
      refreshOutline,
    });
  }

  ngOnInit() {}

  async loadWeather() {
    this.loading = true;
    this.error = null;
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      });
      const { latitude: lat, longitude: lon } = position.coords;
      this.coords = { lat, lon };

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
      const response = await fetch(url);
      const data: OpenMeteoResponse = await response.json();

      this.weather = this.parserWeather(data.current_weather);
    } catch (err: any) {
      console.error('Erro ao obter localização/clima', err);
      this.error =
        'Não foi possível obter a tua localização. Verifica as permissões.';
    } finally {
      this.loading = false;
    }
  }

  private parserWeather(
    current: OpenMeteoResponse['current_weather'],
  ): WeatherView {
    const codes: Record<number, { desc: string; emoji: string }> = {
      0: { desc: 'Céu limpo', emoji: '☀️' },
      1: { desc: 'Poucas nuvens', emoji: '🌤️' },
      2: { desc: 'Parcialmente nublado', emoji: '⛅' },
      3: { desc: 'Nublado', emoji: '☁️' },
      45: { desc: 'Nevoeiro', emoji: '🌫️' },
      61: { desc: 'Chuva fraca', emoji: '🌦️' },
      63: { desc: 'Chuva', emoji: '🌧️' },
      65: { desc: 'Chuva forte', emoji: '🌧️' },
      80: { desc: 'Aguaceiros', emoji: '🌦️' },
      95: { desc: 'Trovoada', emoji: '⛈️' },
    };

    const info = codes[current.weathercode] ?? {
      desc: 'Condição desconhecida',
      emoji: '❓',
    };

    return {
      temperature: current.temperature,
      windspeed: current.windspeed,
      description: info.desc,
      emoji: info.emoji,
    };
  }
}
