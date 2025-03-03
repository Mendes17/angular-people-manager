import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IPeople } from 'src/app/interfaces/people';
import { PeopleService } from 'src/app/services/people.service';
import Swal from 'sweetalert2';
import { ContactShowModalComponent } from '../contact-show-modal/contact-show-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() people$ = new Observable<IPeople[]>();
  @Input() callback!: (personId: number) => void;
  @Input() refreshCallback!: () => void;

  constructor(
    private peopleService: PeopleService,
    private contactService: ContactService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getPeopleRegister();
  }

  getPeopleRegister() {
    this.people$ = this.peopleService.getPeople();
  }

  personDelete(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você esta preste a deletar um registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, deletar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deletado!',
          text: 'O registro foi deletado.',
          icon: 'success',
        });
        this.peopleService.deletePerson(id).subscribe(() => {
          this.getPeopleRegister();
          this.refreshCallback();
        });
      }
    });
  }

  contactShow() {
    const dialogRef = this.dialog.open(ContactShowModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed();
  }
}
