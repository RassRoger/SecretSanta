import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './services/admin.service';
import { Member } from './interfaces/member';
import { MembersDto } from '../../shared/interfaces/members-dto';
import { StateService } from '../../core/services/state.service';
import { Group } from '../../shared/interfaces/Group';
import { MemberService } from '../../core/services/member.service';
import { MatDialog } from '@angular/material/dialog';
import { BlacklistComponent } from './components/blacklist/blacklist.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'personExchange', 'blacklist', 'button'];
  dataSource: Member[] = [];
  group: Group | null = null;

  memberForm: FormGroup = this.fb.group({
    email: ['', Validators.email],
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private memberService: MemberService,
    private stateService: StateService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
     this.group = this.stateService.getGroup();
    this.findAll();
  }


  findAll() {
    if (this.group?.groupId) {
      this.adminService.getMembers(this.group?.groupId).subscribe(res => {
        console.log(res);
        this.dataSource = res;
      });
    }

  }


  async save() {
    if (this.group) {
      const { name, email } = this.memberForm.value;
      const dto: MembersDto = {
        name,
        email,
        personExchange: null,
        blacklist: name,
        admin: true,
        groupId: this.group.groupId,
        groupName: null
      };
      const response: Member = await this.memberService.saveMember(dto).toPromise();
      this.memberForm.reset();
      this.findAll();
    }

  }

  random() {
    if (this.group?.groupId) {
      this.adminService.setRandom(this.group?.groupId).subscribe(res => {
        this.dataSource = res;
      });
    }
  }

  openDialog(member: Member): void {
    console.log(member);
    const members =  this.dataSource.filter(s => s.email !== member.email);
    const dialogRef = this.dialog.open(BlacklistComponent, {
      width: '250px',
      data: {
        members
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result.close === 'ok') {
        const memberSelected: Member[] = result.membersSelected;
        const black = memberSelected.map(m => m.name).toString();
        member.blacklist += "," + black;
          await this.adminService.updateMember(member).toPromise();
          this.findAll();
        }
      });
  }

  // randomJavascript() {
  //   let membersRand: Member[] = JSON.parse(JSON.stringify(this.elements));
  //   membersRand = membersRand.sort((a,b) => b.blacklist.length - a.blacklist.length);
  //   let blacklist = [];
  //   for (let i = 0; i < membersRand.length; i++) {
  //     const black = blacklist.concat(membersRand[i].blacklist);
  //     const arrFind = this.elements.filter(s => !black.includes(s.name));
  //     if (arrFind.length === 0) {
  //       this.permut(membersRand[i]);
  //       break;
  //     }
  //     const memberAssign = this.createRandom(arrFind)
  //     const mem = this.elements.filter(s => s.email === membersRand[i].email)[0];
  //     mem.personExchange = memberAssign.name;
  //     blacklist.push(memberAssign.name);
  //   }
  // }

  // permut(member: Member) {
  //   console.log('Entro a la permuta');
  //   let personExchange = '';
  //   for (let i = 0; i < this.elements.length; i++) {
  //     if (!this.elements[i].blacklist.includes(member.name)) {
  //       if (!member.blacklist.includes(this.elements[i].personExchange)) {
  //         personExchange = this.elements[i].personExchange;
  //         this.elements[i].personExchange = member.name;
  //         break;
  //       }
  //     }
      
  //   }      
  //   const memberChange: Member  = this.elements.filter(s => s.name === member.name)[0];
  //   memberChange.personExchange = personExchange;
  // }

  // createRandom(arrMembers: Member[]) {
  //   let randomElement: Member;
  //   const randomIndex = Math.floor(Math.random() * arrMembers.length);
  //   randomElement = arrMembers[randomIndex];
  //   return randomElement;
  // }

}
