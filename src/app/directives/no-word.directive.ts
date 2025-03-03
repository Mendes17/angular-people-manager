import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoWord]'
})
export class NoWordDirective {
  private regex = /^[0-9-]*$/;

  // Bloqueia a entrada de caracteres que não são números ou hífens
  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Remove caracteres que não são números ou hífens
    input.value = value.replace(/[^0-9-]/g, '');
  }

  // Bloqueia a tecla de caracteres que não são números ou hífens no evento keydown
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const key = event.key;

    // Permite apenas teclas que são números, hífens ou teclas de controle (Backspace, Delete, Tab, etc.)
    if (
      !this.regex.test(key) &&
      key !== 'Backspace' &&
      key !== 'Delete' &&
      key !== 'Tab' &&
      key !== 'ArrowLeft' &&
      key !== 'ArrowRight' &&
      key !== 'Home' &&
      key !== 'End'
    ) {
      event.preventDefault();
    }
  }

}
