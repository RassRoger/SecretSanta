import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MembersDto } from 'src/app/shared/interfaces/members-dto';
import { Member } from '../interfaces/member';

@Injectable()
export class AdminService {

  URL: string = 'api';

  constructor(private http: HttpClient) { }

  public getMembers(groupId: number): Observable<Member[]> {
    const fullUrl = `${this.URL}/members/${groupId}`;
    return this.http.get<Member[]>(fullUrl);
  }

  public setRandom(groupId: number): Observable<Member[]>  {
    const fullUrl = `${this.URL}/members/${groupId}`;
    return this.http.put<Member[]>(fullUrl, {});
  }

  public updateMember(member: Member): Observable<Member> {
    const fullUrl = `${this.URL}/member/`;
    return this.http.put<Member>(fullUrl, member);
  } 

}
