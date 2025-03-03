import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IContact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-show-modal',
  templateUrl: './contact-show-modal.component.html',
  styleUrls: ['./contact-show-modal.component.scss'],
})
export class ContactShowModalComponent {
  constructor(
    private dialogRef: MatDialogRef<ContactShowModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contactsData: IContact[] },
    private contactService: ContactService,
    private router: Router
  ) {
    dialogRef.disableClose = true;
  }

  contact$ = this.data.contactsData;

  ngOnInit(): void {
    console.log(this.data.contactsData);
  }

  close() {
    () => this.router.navigate(['']);
    this.dialogRef.close();
  }
}
