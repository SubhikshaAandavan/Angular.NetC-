import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface EmailDetailsData {
  sentTo: string[];
  subject: string;
  cc: string[];
  bcc: string[];
  body: string;
}

@Component({
  selector: 'app-email-details-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  styleUrls: ['./email-details-dialog.component.css'],
  template: `
    <div class="dialog-box">
    <h2 mat-dialog-title>Email Details</h2>
    <div mat-dialog-content >
      <p><strong>To:</strong> {{ data.sentTo.join(', ') }}</p>
      <p><strong>Subject:</strong> {{ data.subject }}</p>
      <p><strong>CC:</strong> {{ data.cc.join(', ') }}</p>
      <p><strong>BCC:</strong> {{ data.bcc.join(', ') }}</p>
      <p><strong>Body:</strong></p>
      <p>{{ data.body }}</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-raised-button color="primary" (click)="onClose()">Close</button>
    </div>
    </div>
  `
})
export class EmailDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmailDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmailDetailsData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
