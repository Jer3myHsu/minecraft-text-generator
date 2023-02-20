import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Code } from './enums/code';
import { Color, Colors } from './models/color';
import { FormatState } from './models/format-state';

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
  state: FormatState = {
    isBold: false,
    isItalic: false,
    isUnder: false,
    isStrike: false,
    color: ''
  }
  defaultColor!: Color;

  private resetState() {
    this.state = {
      isBold: false,
      isItalic: false,
      isUnder: false,
      isStrike: false,
      color: this.defaultColor.hex
    }
  }

  private needsReset(attributes: any) {
    const wasBold = this.state.isBold && this.state.isBold != !!attributes?.bold;
    const wasItalic = this.state.isItalic && this.state.isItalic != !!attributes?.italic;
    const wasUnder =  this.state.isUnder && this.state.isUnder != !!attributes?.underline;
    const wasStrike = this.state.isStrike && this.state.isStrike != !!attributes?.strike;
    return wasBold || wasItalic || wasUnder || wasStrike;
  }

  private addFormatCodes(attributes: any): string {
    let output = '';
    if (attributes?.bold) {
      output += this.state.isBold ? '' : Code.Bold;
    }
    if (attributes?.italic) {
      output += this.state.isItalic ? '' : Code.Italic;
    }
    if (attributes?.underline) {
      output += this.state.isUnder ? '' : Code.Underline;
    }
    if (attributes?.strike) {
      output += this.state.isStrike ? '' : Code.Strike;
    }
    return output;
  }

  private addColorCodes(attributes: any): string {
    const attributeColor = attributes?.color ?? this.defaultColor.hex;
    const color = Colors.find(color => color.hex.toLowerCase() == attributeColor.toLowerCase());
    return this.state.color.toLowerCase() === color?.hex.toLowerCase() ? '' : (color?.code ?? '');
  }

  private convertToMCString(delta: any): string {
    return delta.ops.reduce((output: string, operation: any, index: number) => {
      if (this.needsReset(operation.attributes)) {
          this.resetState();
          output += index ? Code.Reset : '';
      }
      output += this.addFormatCodes(operation.attributes);
      output += this.addColorCodes(operation.attributes);
      this.state = {
        isBold: !!operation.attributes?.bold,
        isItalic: !!operation.attributes?.italic,
        isUnder: !!operation.attributes?.underline,
        isStrike: !!operation.attributes?.strike,
        color: operation.attributes?.color ?? this.defaultColor.hex
      }
      return output + operation.insert;
    }, '').trim();
  }

  ngOnInit(): void {
    this.colors = Colors;
    this.defaultColor = Colors.find(color => color.name === 'Black') ?? Colors[0];
    this.state.color = this.defaultColor.hex;
  }

  ngAfterViewInit(): void {
    const editor = new Quill('#editor', {
      modules: {
        toolbar: '#toolbar'
      },
      placeholder: 'Type your message...',
      theme: 'snow'
    });

    editor.on('text-change', (delta: any, oldDelta: any, source: string) => {
      if (source !== 'user') {
        return;
      }
      this.text = this.text.compose(delta);
      console.log(this.text)
      this.resetState();
      // editor.format('color', `${this.defaultColor.hex}`);
      this.outputString = this.convertToMCString(this.text);
    });
  }
}
