import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '../../../../core/services/member.service';
import { MembersDto } from '../../../../shared/interfaces/members-dto';
import { StateService } from '../../../../core/services/state.service';
import { Member } from '../../../admin/interfaces/member';
import { Group } from '../../../../shared/interfaces/Group';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    email: ['', Validators.email],
    name: ['', Validators.required],
    groupName: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private memberService: MemberService,
    private stateService: StateService
  ) { }

  ngOnInit() {
  }

  async register() {
    const { name, email, groupName } = this.registerForm.value;
    const dto: MembersDto = {
      name,
      email,
      personExchange: null,
      blacklist: name,
      admin: true,
      groupId: null,
      groupName
    };
    const response: Member = await this.memberService.saveMember(dto).toPromise();
    if (response.groupId) {
      const group : Group = {
        groupId: response.groupId,
        name: response.name
      };
      this.stateService.group = group;
      sessionStorage.setItem('group', JSON.stringify(group));
    }
    this.router.navigate(['/admin']);
  }

  clear() {
    this.registerForm.reset();
  }

}
