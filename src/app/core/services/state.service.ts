import { Injectable } from '@angular/core';
import { Group } from '../../shared/interfaces/Group';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  group: Group | null = null;

constructor() { }

public getGroup() {
  let group = this.group;
  if (!group) {
    const jsonGroup = sessionStorage.getItem('group');
    group = jsonGroup ? JSON.parse(jsonGroup) : null;
  }
  return group;
}

}
