import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'simple-modal-dialog',
  templateUrl: 'simple-modal-dialog.html'
})
export class SimpleModalDiag {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(SimpleDialog, {
      width: '250px',
      data: {}
    });
  }

}

@Component({
    selector: 'dialog-overview-example-dialog',
    template: `
  <div mat-dialog-content>
  <p>test</p>
  <mat-form-field>
    <input matInput [(ngModel)]="data.places">
  </mat-form-field>
</div>`,
  })
  export class SimpleDialog {
  
    constructor(
      public dialogRef: MatDialogRef<SimpleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }
  
