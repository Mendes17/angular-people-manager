import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ContactShowModalComponent } from 'src/app/components/contact-show-modal/contact-show-modal.component';
import { IPeople } from 'src/app/interfaces/people';
import { ContactService } from 'src/app/services/contact.service';
import { PeopleService } from 'src/app/services/people.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent {
  people$ = new Observable<IPeople[]>();
  constructor(
    private peopleService: PeopleService,
    private contactService: ContactService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getPeopleRegister();
  }

  getPeopleRegister() {
    this.people$ = this.peopleService.getPeople();
  }

  getPeopleContact(id: number) {
    this.contactService.getContacts(id).subscribe({
      next: (response) => {
        const dialogRef = this.dialog.open(ContactShowModalComponent, {
          width: '500px',
          data: { contactsData: response },
        });
        dialogRef.afterClosed();
      },
      error: (error) => {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Usuário sem contato!',
        });
      },
    });
  }

  refreshCallback() {
    this.people$ = this.peopleService.getPeople();
  }

}
