import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoSpecialChar]'
})
export class NoSpecialCharDirective {

private regex = /^[a-zA-ZáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕçÇ\s]*$/;

@HostListener('input', ['$event']) onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  input.value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕçÇ\s]/g, '');
}

@HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
  const key = event.key;

  if (!this.regex.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'Tab') {
    event.preventDefault();
  }
}
}
