import { Code } from "../enums/code";

export interface Color {
  code: string;
  name: string;
  hex: string;
}

export const Colors: Color[] = [{
    code: Code.White,
    name: 'White',
    hex: '#FFFFFF'
  }, {
    code: Code.Gray,
    name: 'Gray',
    hex: '#AAAAAA'
  }, {
    code: Code.DarkGray,
    name: 'Dark Gray',
    hex: '#555555'
  }, {
    code: Code.Black,
    name: 'Black',
    hex: '#000000'
  }, {
    code: Code.Blue,
    name: 'Blue',
    hex: '#5555FF'
  }, {
    code: Code.DarkBlue,
    name: 'Dark Blue',
    hex: '#0000AA'
  }, {
    code: Code.Aqua,
    name: 'Aqua',
    hex: '#55FFFF'
  }, {
    code: Code.DarkAqua,
    name: 'Dark Aqua',
    hex: '#00AAAA'
  }, {
    code: Code.Green,
    name: 'Green',
    hex: '#55FF55'
  }, {
    code: Code.DarkGreen,
    name: 'Dark Green',
    hex: '#00AA00'
  }, {
    code: Code.Yellow,
    name: 'Yellow',
    hex: '#FFFF55'
  }, {
    code: Code.MinecoinGold,
    name: 'Minecoin Gold',
    hex: '#DDD605'
  }, {
    code: Code.Gold,
    name: 'Gold',
    hex: '#FFAA00'
  }, {
    code: Code.Red,
    name: 'Red',
    hex: '#FF5555'
  }, {
    code: Code.DarkRed,
    name: 'Dark Red',
    hex: '#AA0000'
  }, {
    code: Code.LightPurple,
    name: 'Light Purple',
    hex: '#FF55FF'
  }, {
    code: Code.DarkPurple,
    name: 'Dark Purple',
    hex: '#AA00AA'
  },
];
