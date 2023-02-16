import { Component, OnInit } from '@angular/core';
import { Color, colors } from './models/color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  Delta = Quill.import('delta');
  colors: Color[] = [];
  text = new this.Delta();

  constructor() {}

  private convertToMCString(delta: any): string {
    const S = '§';
    return delta.ops.reduce((output: string, operation: any) => {
      if (operation.attributes?.bold) {
        output += `${S}l`;
      }
      if (operation.attributes?.italic) {
        output += `${S}o`;
      }
      if (operation.attributes?.underline) {
        output += `${S}n`;
      }
      if (operation.attributes?.strike) {
        output += `${S}m`;
      }
      if (operation.attributes?.color) {
        output += this.colors.find(color => color.hex === operation.attributes.color)?.code;
      }
      return output + operation.insert;
    }, '');
  }

  ngOnInit(): void {
    this.colors = colors;
    const editor = new Quill('#editor', {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{'color': colors.map(c => c.hex)}, /* obfuscated */],
          ['clean']
        ]
      },
      theme: 'snow'
    });

    editor.on('text-change', (delta: any, oldDelta: any, source: string) => {
      if (source !== 'user') {
        return;
      }
      this.text = this.text.compose(delta);
      console.log(this.text);
      console.log(this.convertToMCString(this.text));
    });
  }
}
