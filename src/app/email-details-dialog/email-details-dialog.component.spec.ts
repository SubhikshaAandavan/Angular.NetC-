import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDetailsDialogComponent } from './email-details-dialog.component';

describe('EmailDetailsDialogComponent', () => {
  let component: EmailDetailsDialogComponent;
  let fixture: ComponentFixture<EmailDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
