import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { EmailService } from '../../services/email.service';
import { MatDialogModule } from '@angular/material/dialog';

// Constant users mapping
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
  selector: 'app-email-form',
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
  
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {
  emailData = {
    from: '',
    to: [] as string[],
    cc: [] as string[],
    bcc: [] as string[],
    subject: '',
    body: ''
  };

  @Output() cancel = new EventEmitter<void>();
  @Output() emailSent = new EventEmitter<{
    to: string[],
    subject: string,
    cc: string[],
    bcc: string[],
    body: string,
    status: 'Success' | 'Unsuccess',
    date: Date
  }>();

  constructor(private emailService: EmailService) { }

  private isValidEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  // Helper to display user name for a given email.
  getDisplayName(email: string): string {
    return getUserName(email);
  }

  addTo(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      if (this.isValidEmail(value)) {
        if (!this.emailData.to.includes(value)) {
          this.emailData.to.push(value);
        }
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
        if (!this.emailData.cc.includes(value)) {
          this.emailData.cc.push(value);
        }
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
        if (!this.emailData.bcc.includes(value)) {
          this.emailData.bcc.push(value);
        }
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
        this.emailSent.emit({
          to: this.emailData.to,
          subject: this.emailData.subject,
          cc: this.emailData.cc,
          bcc: this.emailData.bcc,
          body: this.emailData.body,
          status: 'Success',
          date: new Date()
        });
        this.onCancel();
      },
      error: error => {
        alert('Failed to send email.');
        this.emailSent.emit({
          to: this.emailData.to,
          subject: this.emailData.subject,
          cc: this.emailData.cc,
          bcc: this.emailData.bcc,
          body: this.emailData.body,
          status: 'Unsuccess',
          date: new Date()
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
    this.cancel.emit();
  }
}
