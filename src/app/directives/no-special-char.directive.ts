import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoSpecialChar]'
})
export class NoSpecialCharDirective {
// Regex para permitir apenas letras (incluindo acentuadas) e espaços
private regex = /^[a-zA-ZáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕçÇ\s]*$/;

// Bloqueia a entrada de caracteres especiais
@HostListener('input', ['$event']) onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  // Remove caracteres que não são letras ou espaços
  input.value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕçÇ\s]/g, '');
}

// Bloqueia a tecla de caracteres especiais no evento keydown
@HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
  const key = event.key;

  // Permite apenas teclas que são letras ou espaços
  if (!this.regex.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'Tab') {
    event.preventDefault();
  }
}
}
