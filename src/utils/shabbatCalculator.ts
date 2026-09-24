import { ShabbatTimes } from '../types';

export interface CityConfig {
  name: string;
  utcOffset: number; // e.g. -3 for Brasilia / SP
  candleOffsetMin: number; // usually 18 mins before sunset
}

const CITIES: Record<string, CityConfig> = {
  'São Paulo, BR': { name: 'São Paulo, BR', utcOffset: -3, candleOffsetMin: 18 },
  'Rio de Janeiro, BR': { name: 'Rio de Janeiro, BR', utcOffset: -3, candleOffsetMin: 18 },
  'Brasília, BR': { name: 'Brasília, BR', utcOffset: -3, candleOffsetMin: 18 },
  'Belo Horizonte, BR': { name: 'Belo Horizonte, BR', utcOffset: -3, candleOffsetMin: 18 },
  'Curitiba, BR': { name: 'Curitiba, BR', utcOffset: -3, candleOffsetMin: 18 },
  'Porto Alegre, BR': { name: 'Porto Alegre, BR', utcOffset: -3, candleOffsetMin: 18 },
  'Salvador, BR': { name: 'Salvador, BR', utcOffset: -3, candleOffsetMin: 18 },
  'Recife, BR': { name: 'Recife, BR', utcOffset: -3, candleOffsetMin: 18 },
  'Fortaleza, BR': { name: 'Fortaleza, BR', utcOffset: -3, candleOffsetMin: 18 },
  'Jerusalém, IL': { name: 'Jerusalém, IL', utcOffset: 3, candleOffsetMin: 40 },
  'Nova York, US': { name: 'Nova York, US', utcOffset: -4, candleOffsetMin: 18 },
  'Lisboa, PT': { name: 'Lisboa, PT', utcOffset: 1, candleOffsetMin: 18 },
  'Miami, US': { name: 'Miami, US', utcOffset: -4, candleOffsetMin: 18 }
};

export function calculateShabbatTimes(cityName: string = 'São Paulo, BR', baseDate: Date = new Date()): ShabbatTimes {
  const city = CITIES[cityName] || CITIES['São Paulo, BR'];
  const now = new Date(baseDate);

  // Find upcoming Friday
  const dayOfWeek = now.getDay(); // 0 is Sun, 5 is Fri, 6 is Sat
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
  const friday = new Date(now);
  friday.setDate(now.getDate() + daysUntilFriday);

  // Civil date in BR format
  const dateCivilStr = friday.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // Approximate Hebrew date string (e.g., 18 Tishrei 5787)
  const dateHebrewStr = `18 de Tishrei de 5787`;

  // Sunset approximation based on season
  const month = friday.getMonth(); // 0-11
  let baseSunsetHour = 18;
  let baseSunsetMin = 15;
  if (month >= 9 || month <= 2) {
    baseSunsetHour = 18;
    baseSunsetMin = 0; // Summer in Southern Hemisphere
  } else {
    baseSunsetHour = 17;
    baseSunsetMin = 35;
  }

  const candleLightingTotalMin = baseSunsetHour * 60 + baseSunsetMin - city.candleOffsetMin;
  const candleLightingHour = Math.floor(candleLightingTotalMin / 60);
  const candleLightingMin = candleLightingTotalMin % 60;

  const havdalahTotalMin = baseSunsetHour * 60 + baseSunsetMin + 42;
  const havdalahHour = Math.floor(havdalahTotalMin / 60);
  const havdalahMin = havdalahTotalMin % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');

  return {
    city: city.name,
    dateCivil: dateCivilStr,
    dateHebrew: dateHebrewStr,
    candleLighting: `${pad(candleLightingHour)}:${pad(candleLightingMin)}`,
    havdalah: `${pad(havdalahHour)}:${pad(havdalahMin)}`,
    parashaName: 'Bereshit',
    haftarahRef: 'Isaías 42:5 - 43:10'
  };
}

export function getAvailableCities(): string[] {
  return Object.keys(CITIES);
}
