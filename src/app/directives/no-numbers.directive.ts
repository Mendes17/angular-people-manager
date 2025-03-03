import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoNumbers]'
})
export class NoNumbersDirective {

  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Remove números do valor do input
    input.value = value.replace(/[0-9]/g, '');
  }

  // Bloqueia a tecla de números no evento keydown
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const key = event.key;

    // Permite apenas teclas que não são números
    if (/\d/.test(key)) {
      event.preventDefault();
    }
  }

}
