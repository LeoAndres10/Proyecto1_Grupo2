import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-entrada',
  imports: [],
  templateUrl: './entrada.html',
  styleUrl: './entrada.css'
})
export class Entrada {
 @Input() id!: string;
  @Input() iconName!: string;       // clase para el <i>
  @Input() inputType: string = 'text';
  @Input() placeHolder: string = '';
  @Input() value: string | number | null= '';

  @Output() valueChange = new EventEmitter<string | number | null>();

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;

    // Para input type number, convertimos el string a número o null si está vacío
    let val: string | number | null = input.value;

    if (this.inputType === 'number') {
      val = input.value === '' ? null : Number(input.value);
    }
    this.value=val;
    this.valueChange.emit(val)
}
}
