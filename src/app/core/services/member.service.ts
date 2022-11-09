import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MembersDto } from '../../shared/interfaces/members-dto';
import { Member } from '../../features/admin/interfaces/member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  URL: string = 'api';

constructor(private http: HttpClient) { }

  public saveMember(dto: MembersDto): Observable<Member> {
    const fullUrl = `${this.URL}/member`;
    return this.http.post<Member>(fullUrl, dto);
  }

}
