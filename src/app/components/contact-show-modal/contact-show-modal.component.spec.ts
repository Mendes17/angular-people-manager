import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactShowModalComponent } from './contact-show-modal.component';

describe('ContactShowModalComponent', () => {
  let component: ContactShowModalComponent;
  let fixture: ComponentFixture<ContactShowModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactShowModalComponent]
    });
    fixture = TestBed.createComponent(ContactShowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
