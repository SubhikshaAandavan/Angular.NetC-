import { Component, Inject, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailService } from '../services/email.service';
import { MatDialogModule } from '@angular/material/dialog';




const USERS = [
  { userName: 'Subhi John ', email: 'subhiaandav@gmail.com' },
  { userName: 'Subhi Mary ', email: 'subhikshaaandavan10@gmail.com' },
  { userName: 'Tamil Alice', email: 'tamilenglish10012004@gmail.com' },
  
];
function getUserName(email: string): string {
  const found = USERS.find(u => u.email === email);
  return found ? found.userName : email;
}

@Component({
  selector: 'app-email-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './email-form-dialog.component.html',
  styleUrls: ['./email-form-dialog.component.css']
})
export class EmailFormDialogComponent {
  emailData = {
    from: '',
    to: [] as string[],
    cc: [] as string[],
    bcc: [] as string[],
    subject: '',
    body: ''
  };

  constructor(
    private dialogRef: MatDialogRef<EmailFormDialogComponent>,
    private emailService: EmailService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
   
  }

 
  private isValidEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }


  getDisplayName(email: string): string {
    return getUserName(email);
  }

  addTo(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      if (this.isValidEmail(value)) {
        this.emailData.to.push(value);
      } else {
        alert(`Invalid email address: ${value}`);
      }
    }
    event.chipInput?.clear();
  }

  removeTo(recipient: string): void {
    this.emailData.to = this.emailData.to.filter(r => r !== recipient);
  }


  addCc(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      if (this.isValidEmail(value)) {
        this.emailData.cc.push(value);
      } else {
        alert(`Invalid email address: ${value}`);
      }
    }
    event.chipInput?.clear();
  }

  removeCc(recipient: string): void {
    this.emailData.cc = this.emailData.cc.filter(r => r !== recipient);
  }


  addBcc(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      if (this.isValidEmail(value)) {
        this.emailData.bcc.push(value);
      } else {
        alert(`Invalid email address: ${value}`);
      }
    }
    event.chipInput?.clear();
  }

  removeBcc(recipient: string): void {
    this.emailData.bcc = this.emailData.bcc.filter(r => r !== recipient);
  }

  onSubmit(): void {

    if (!this.emailData.from || !this.isValidEmail(this.emailData.from)) {
      alert("Please enter a valid 'From' email address.");
      return;
    }
    if (!this.emailData.to.length) {
      alert("Please add at least one 'To' recipient.");
      return;
    }
    if (!this.emailData.subject) {
      alert("Subject is required.");
      return;
    }
    if (!this.emailData.body) {
      alert("Body is required.");
      return;
    }

 
    this.emailService.sendEmail(this.emailData).subscribe({
      next: response => {
        alert('Email sent successfully!');
        this.dialogRef.close({
          status: 'Success',
          to: this.emailData.to,
          cc: this.emailData.cc,
          bcc: this.emailData.bcc,
          subject: this.emailData.subject,
          body: this.emailData.body
        });
      },
      error: err => {
        alert('Failed to send email.');
              this.dialogRef.close({
          status: 'Unsuccess',
          to: this.emailData.to,
          cc: this.emailData.cc,
          bcc: this.emailData.bcc,
          subject: this.emailData.subject,
          body: this.emailData.body
        });
      }
    });
  }

  onCancel(): void {
    
    this.emailData = {
      from: '',
      to: [],
      cc: [],
      bcc: [],
      subject: '',
      body: ''
    };
  }

  onCancelNewMessage(): void {
  
    this.dialogRef.close(null);
  }
}
