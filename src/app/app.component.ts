/*import { MatTableDataSource } from '@angular/material/table';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmailDetailsDialogComponent } from './email-details-dialog/email-details-dialog.component';
interface SentEmail {
  sentTo: string[];
  subject: string;
  cc: string[];
  bcc: string[];
  body: string;
  date: Date;
  sentStatus: 'Success' | 'Unsuccess';
}


const USERS = [
  { userName: 'Subhi John ', email: 'subhiaandav@gmail.com' },
  { userName: 'Subhi Mary ', email: 'subhikshaaandavan10@gmail.com' },
  { userName: 'Tamil Alice', email: 'tamilenglish10012004@gmail.com' },
  
];


function getUserNameFromEmail(email: string): string {
  const found = USERS.find(u => u.email === email);
  return found ? found.userName : email;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmailFormComponent, MatTableModule,MatDialogModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showEmailForm = false;
  sentEmails: SentEmail[] = [];
  displayedColumns: string[] = ['sentTo', 'subject', 'date', 'cc', 'bcc', 'body', 'sentStatus'];
  dataSource = new MatTableDataSource<SentEmail>(this.sentEmails);
  sortAsc: boolean = true;

  getUserNameFromEmail(email: string): string {
    return getUserNameFromEmail(email);
  }
  getSentToDisplay(sentTo: string[]): string {
    return sentTo.map(e => this.getUserNameFromEmail(e)).join(', ');
  }
  

  constructor(private dialog: MatDialog) {
    this.dataSource.filterPredicate = (data: SentEmail, filter: string) => {
      const dataStr =
        data.sentTo.join(' ') +
        ' ' +
        data.subject +
        ' ' +
        data.cc.join(' ') +
        ' ' +
        data.bcc.join(' ') +
        ' ' +
        data.body +
        ' ' +
        data.sentStatus;
      return dataStr.toLowerCase().includes(filter);
    };
  }

  onEmailSent(event: { 
    to: string[],
    subject: string,
    cc: string[],
    bcc: string[],
    body: string,
    status: 'Success' | 'Unsuccess'
  }): void {
    this.sentEmails.push({
      sentTo: event.to,
      subject: event.subject,
      cc: event.cc,
      bcc: event.bcc,
      body: event.body,
      date: new Date(),
      sentStatus: event.status,
    });
    this.dataSource.data = this.sentEmails;
    this.showEmailForm = false;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortByDate(): void {
    this.sortAsc = !this.sortAsc;
    this.sentEmails.sort((a, b) => {
      return this.sortAsc
        ? a.date.getTime() - b.date.getTime()
        : b.date.getTime() - a.date.getTime();
    });
    this.dataSource.data = this.sentEmails;
  }

  
  openEmailDetails(email: SentEmail): void {
    this.dialog.open(EmailDetailsDialogComponent, {
      width: '1000px',
      maxHeight: '200vh', 
      data: {
        sentTo: email.sentTo,
        subject: email.subject,
        cc: email.cc,
        bcc: email.bcc,
        body: email.body
      }
    });
  }
}*/
import { MatTableDataSource } from '@angular/material/table';
import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { EmailDetailsDialogComponent } from './email-details-dialog/email-details-dialog.component';
import { EmailFormDialogComponent } from './email-form-dialog/email-form-dialog.component';


interface SentEmail {
  sentTo: string[];
  subject: string;
  cc: string[];
  bcc: string[];
  body: string;
  date: Date;
  sentStatus: 'Success' | 'Unsuccess';
}


const USERS = [
  { userName: 'Subhi John', email: 'subhiaandav@gmail.com' },
  { userName: 'Subhi Mary', email: 'subhikshaaandavan10@gmail.com' },
  { userName: 'Tamil Alice', email: 'tamilenglish10012004@gmail.com' }
];


function getUserNameFromEmail(email: string): string {
  const found = USERS.find(u => u.email === email);
  return found ? found.userName : email;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    EmailFormComponent,
    MatTableModule,
    MatDialogModule,
    MatSortModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  sentEmails: SentEmail[] = [];
  displayedColumns: string[] = ['sentTo', 'subject', 'date', 'cc', 'bcc', 'body', 'sentStatus'];
  dataSource = new MatTableDataSource<SentEmail>(this.sentEmails);
  sortAsc: boolean = true;

  @ViewChild(MatSort) sort!: MatSort;

 
  getUserNameFromEmail(email: string): string {
    return getUserNameFromEmail(email);
  }

 
  getSentToDisplay(sentTo: string[]): string {
    return sentTo.map(e => this.getUserNameFromEmail(e)).join(', ');
  }

  constructor(private dialog: MatDialog) {
 
    this.dataSource.filterPredicate = (data: SentEmail, filter: string) => {
      const dataStr =
        data.sentTo.join(' ') +
        ' ' +
        data.subject +
        ' ' +
        data.cc.join(' ') +
        ' ' +
        data.bcc.join(' ') +
        ' ' +
        data.body +
        ' ' +
        data.sentStatus;
      return dataStr.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  onEmailSent(event: { 
    to: string[],
    subject: string,
    cc: string[],
    bcc: string[],
    body: string,
    status: 'Success' | 'Unsuccess'
  }): void {
    this.sentEmails.push({
      sentTo: event.to,
      subject: event.subject,
      cc: event.cc,
      bcc: event.bcc,
      body: event.body,
      date: new Date(),
      sentStatus: event.status,
    });
    this.dataSource.data = this.sentEmails;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  sortByDate(): void {
    this.sortAsc = !this.sortAsc;
    this.sentEmails.sort((a, b) =>
      this.sortAsc ? a.date.getTime() - b.date.getTime() : b.date.getTime() - a.date.getTime()
    );
    this.dataSource.data = this.sentEmails;
  }

 
  openEmailDetails(email: SentEmail): void {
    this.dialog.open(EmailDetailsDialogComponent, {
      width: '1000px',
      maxHeight: '80vh',
      panelClass: 'custom-dialog-container',
      data: {
        sentTo: email.sentTo,
        subject: email.subject,
        cc: email.cc,
        bcc: email.bcc,
        body: email.body
      }
    });
  }


  openNewMessageDialog(): void {
    const dialogRef = this.dialog.open(EmailFormDialogComponent, {
      width: '500px',
      
      height:'500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status === 'Success') {
        
        this.sentEmails.push({
          sentTo: result.to,
          subject: result.subject,
          cc: result.cc,
          bcc: result.bcc,
          body: result.body,
          date: new Date(),
          sentStatus: result.status
        });
        this.dataSource.data = this.sentEmails;
      } else {
        
      }
    });
  }
}
