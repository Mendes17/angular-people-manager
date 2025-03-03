import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
})
export class ContactModalComponent {
  constructor(
    private contactService: ContactService,
    private router: Router,
    private dialogRef: MatDialogRef<ContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { personId: number }
  ) {}

  personId = this.data.personId;

  contactType = ['TELEFONE', 'CELULAR', 'EMAIL'];
  type: string = '';

  person = {
    nome: '',
    cep: String(''),
    endereco: '',
    cidade: '',
    uf: '',
  };

  contact = {
    tipoContato: '',
    contato: '',
    pessoa: {
      id: Number(this.personId),
    },
  };

  maxLength = 0;

  cancel() {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }

  contactRegister() {
    if (!this.contact.contato && !this.contact.tipoContato) {
      Swal.fire('Atenção', 'Preencha todos os campos!', 'warning');
      return;
    }
    if (
      this.contact.tipoContato === 'CELULAR' &&
      this.contact.contato.length < 15
    ) {
      Swal.fire('Atenção', 'Preencha celular corretamente!', 'warning');
      return;
    }
    if (
      this.contact.tipoContato === 'TELEFONE' &&
      this.contact.contato.length < 14
    ) {
      Swal.fire('Atenção', 'Preencha telefone corretamente!', 'warning');
      return;
    }
    if (
      this.contact.tipoContato === 'EMAIL' &&
      !this.validarEmail(this.contact.contato)
    ) {
      Swal.fire('Atenção', 'Preencha um e-mail válido!', 'warning');
      return;
    }
    this.contactService.contactRegister(this.contact).subscribe(() => {
      Swal.fire('Sucesso', 'Contato cadastrado com sucesso!', 'success')
        .then(() => this.router.navigate(['/']))
        .then(() => this.cancel());
    });
  }

  formatarContato(event: any) {
    if (this.contact.tipoContato === 'CELULAR') {
      let value = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

      // Aplica a máscara dinamicamente
      if (value.length > 2) {
        value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
      }
      if (value.length > 10) {
        value = `${value.substring(0, 10)}-${value.substring(10, 15)}`;
      }
      // Atualiza o valor do input
      event.target.value = value;
    }
    if (this.contact.tipoContato === 'TELEFONE') {
      let value = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
      // Aplica a máscara dinamicamente
      if (value.length > 2) {
        value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
      }
      if (value.length > 10) {
        value = `${value.substring(0, 9)}-${value.substring(9, 14)}`;
      } else if (value.length > 6) {
        value = `${value.substring(0, 6)}-${value.substring(6, 10)}`;
      }
      // Atualiza o valor do input
      event.target.value = value;
    }
  }

  validarEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  tamanhoInput() {
    if (this.contact.tipoContato === 'CELULAR') {
      this.maxLength = 15; // Celular: (99) 99999-9999 (15 caracteres)
    } else if (this.contact.tipoContato === 'TELEFONE') {
      this.maxLength = 14; // Telefone fixo: (99) 9999-9999 (14 caracteres)
    } else if (this.contact.tipoContato === 'EMAIL') {
      this.maxLength = 255; // E-mail: tamanho máximo comum
    } else {
      this.maxLength = 0; // Sem limite se nenhum tipo for selecionado
    }
  }
}
