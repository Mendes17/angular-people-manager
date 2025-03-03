import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoNumbers]'
})
export class NoNumbersDirective {

  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    
    input.value = value.replace(/[0-9]/g, '');
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const key = event.key;

    if (/\d/.test(key)) {
      event.preventDefault();
    }
  }

}
