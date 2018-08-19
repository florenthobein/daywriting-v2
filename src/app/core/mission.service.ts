import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Mission } from '../models/mission';

@Injectable()
export class MissionService {

  private static MISSIONS_ENDPOINT = '/missions';

  constructor(private http: HttpClient) {
  }

  loadMissions$(): Observable<any> {
    return this.http.get(MissionService.MISSIONS_ENDPOINT);
  }

  getMission$(id: string): Observable<any> {
    return this.http.get(MissionService.MISSIONS_ENDPOINT +
      '/' + id);
  }

  addMission$(mission: Mission): Observable<any> {
    return this.http.post(MissionService.MISSIONS_ENDPOINT, mission);
  }

  deleteMission$(mission: Mission): Observable<any> {
    return this.http.delete(MissionService.MISSIONS_ENDPOINT +
      '/' + mission.id);
  }

}
