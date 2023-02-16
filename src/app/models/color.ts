export interface Color {
  code: string;
  name: string;
  hex: string;
}

export const colors: Color[] = [{
    code: 'f',
    name: 'White',
    hex: '#FFFFFF'
  }, {
    code: '7',
    name: 'Gray',
    hex: '#AAAAAA'
  }, {
    code: '8',
    name: 'Dark Gray',
    hex: '#555555'
  }, {
    code: '0',
    name: 'Black',
    hex: '#000000'
  }, {
    code: '9',
    name: 'Blue',
    hex: '#5555FF'
  }, {
    code: '1',
    name: 'Dark Blue',
    hex: '#0000AA'
  }, {
    code: 'b',
    name: 'Aqua',
    hex: '#55FFFF'
  }, {
    code: '3',
    name: 'Dark Aqua',
    hex: '#00AAAA'
  }, {
    code: 'a',
    name: 'Green',
    hex: '#55FF55'
  }, {
    code: '2',
    name: 'Dark Green',
    hex: '#00AA00'
  }, {
    code: 'e',
    name: 'Yellow',
    hex: '#FFFF55'
  }, {
    code: 'g',
    name: 'Minecoin Gold',
    hex: '#DDD605'
  }, {
    code: '6',
    name: 'Gold',
    hex: '#FFAA00'
  }, {
    code: 'c',
    name: 'Red',
    hex: '#FF5555'
  }, {
    code: '4',
    name: 'Dark Red',
    hex: '#AA0000'
  }, {
    code: 'd',
    name: 'Light Purple',
    hex: '#FF55FF'
  }, {
    code: '5',
    name: 'Dark Purple',
    hex: '#AA00AA'
  },
].map(color => {
  color.code = '§' + color.code;
  return color;
});
