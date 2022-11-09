import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from '../../interfaces/member';


@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss']
})
export class BlacklistComponent implements OnInit {

  members: Member[] = this.data.members;
  membersSelected: Member[] = [];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: {members: Member[]}
  ) { }

  ngOnInit() {
  }

  select(check: boolean, member: Member) {
    if (check) {
      this.membersSelected.push(member);
    } else {
      this.membersSelected = this.membersSelected.filter(s => s.id !== member.id);
    }
    console.log(this.membersSelected);
    
  }

  close(close: string) {
    const closeObj = {
      close,
      membersSelected: this.membersSelected
    };
    this.dialogRef.close(closeObj);
  }

}
