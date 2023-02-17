import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Color, colors } from './models/color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  Delta = Quill.import('delta');
  colors: Color[] = [];
  text = new this.Delta();
  outputString: string = '';

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
        output += this.colors.find(color => color.hex.toLowerCase() === operation.attributes.color.toLowerCase())?.code;
      }
      return output + operation.insert + `${S}r`;
    }, '');
  }

  ngOnInit(): void {
    this.colors = colors;
  }

  ngAfterViewInit(): void {
    const editor = new Quill('#editor', {
      modules: {
        toolbar: '#toolbar'
      },
      theme: 'snow'
    });

    editor.on('text-change', (delta: any, oldDelta: any, source: string) => {
      if (source !== 'user') {
        return;
      }
      this.text = this.text.compose(delta);
      this.outputString = this.convertToMCString(this.text);
    });
  }
}
