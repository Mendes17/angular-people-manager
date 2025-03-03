import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeopleService } from 'src/app/services/people.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.scss'],
})
export class PeopleEditComponent {
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getPerson(id: number) {
    return this.peopleService.getPerson(id);
  }

  person = {
    id: this.route.snapshot.params['id'],
    nome: '',
    cep: '',
    endereco: '',
    cidade: '',
    uf: '',
  };

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.getPerson(id).subscribe((person) => {
      this.person.nome = person.nome;
      this.person.cep = person.cep;
      this.person.endereco = person.endereco;
      this.person.cidade = person.cidade;
      this.person.uf = person.uf;
    });
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

  update() {
    if (!this.person.nome) {
      Swal.fire('Atenção', 'Preencha o campo nome!', 'warning');
      return;
    } else if (!this.person.cep) {
      Swal.fire('Atenção', 'Preencha o campo CEP!', 'warning');
      return;
    } else if (!this.person.endereco) {
      Swal.fire('Atenção', 'Preencha o campo endereco!', 'warning');
      return;
    } else if (!this.person.cidade) {
      Swal.fire('Atenção', 'Preencha o campo cidade!', 'warning');
      return;
    } else if (!this.person.uf) {
      Swal.fire('Atenção', 'Preencha o campo UF!', 'warning');
      return;
    }

    this.peopleService
      .personUdpate({
        id: this.person.id,
        nome: this.person.nome,
        cep: this.person.cep,
        endereco: this.person.endereco,
        cidade: this.person.cidade,
        uf: this.person.uf,
      })
      .subscribe((_) => {
        Swal.fire('Sucesso', 'Pessoa atualizada com sucesso!', 'success').then(
          () => this.router.navigate(['/'])
        );
      });
  }
}
