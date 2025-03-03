import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactModalComponent } from 'src/app/components/contact-modal/contact-modal.component';
import { PeopleService } from 'src/app/services/people.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-people-register',
  templateUrl: './people-register.component.html',
  styleUrls: ['./people-register.component.scss'],
})
export class PeopleRegisterComponent {
  person = {
    nome: '',
    cep: '',
    endereco: '',
    cidade: '',
    uf: '',
  };


  estados = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  constructor(
    private httpClient: HttpClient,
    private peopleService: PeopleService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    if (this.route.snapshot.params['id']) {
      this.addContact();
    }
  }

  formatarCep(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{0,3})$/, '$1-$2'); // Adiciona o "-"
    }

    this.person.cep = value; // Atualiza o valor do CEP
  }

  buscarCep() {
    const cep = this.person.cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 0) {
      return;
    }
    if (cep.length < 8) {
      Swal.fire('CEP incompleto!', 'Preencha o CEP corretamente!', 'warning');
    }
    if (cep.length === 8) {
      this.httpClient
        .get<any>(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe((dados) => {
          if (!dados.erro) {
            this.person.endereco = `${dados.logradouro}, ${dados.bairro}`;
            this.person.cidade = dados.localidade;
            this.person.uf = dados.uf;
          } else {
            Swal.fire('CEP não encontrado!', 'Digite um CEP valido!', 'error');
            this.person.cep = '';
          }
        });
    }
  }

  personRegister() {
   if(!this.person.nome) {
    Swal.fire('Atenção', 'Preencha o campo nome!', 'warning');
    return;
   } else if(!this.person.cep) {
    Swal.fire('Atenção', 'Preencha o campo CEP!', 'warning');
    return;
   } else if(!this.person.endereco) {
    Swal.fire('Atenção', 'Preencha o campo endereco!', 'warning');
    return;
   } else if(!this.person.cidade) {
    Swal.fire('Atenção', 'Preencha o campo cidade!', 'warning');
    return;
   } else if(!this.person.uf) {
     Swal.fire('Atenção', 'Preencha o campo UF!', 'warning');
     return;
   }

    this.peopleService.personRegister(this.person).subscribe((person) => {
      Swal.fire('Sucesso', 'Pessoa cadastrada com sucesso!', 'success').then(
        () => this.router.navigate([`pessoas/register/${person.id}`])
      );
    });
  }

  addContact() {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      disableClose: true,
      width: '500px',
      data: { personId: this.route.snapshot.params['id'] },
    });

    dialogRef.afterClosed();
  }
}
