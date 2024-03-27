import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../classes/member';
import { CoronaPatient } from '../classes/coronaPatient';

@Injectable({
  providedIn: 'root'
})
export class CoronaPatientsService {

  backendAddress='http://127.0.0.1:5000'
  constructor(public http:HttpClient) { }
  get_by_id(id:string):Observable<CoronaPatient>
  {
    return this.http.get<CoronaPatient>(this.backendAddress+`/corona_patients/${id}`)
  }
  add_corona_patient(patient:CoronaPatient):Observable<any>
  {
    return this.http.post<any>(this.backendAddress+'/corona_patients/add',patient)
  }
  delete_corona_patient(id:string):Observable<string>{
    return this.http.delete<string>(this.backendAddress+`/corona_patients/delete/${id}`)
  }
  update_corona_patient(patient:CoronaPatient):Observable<string>
  {
    return this.http.put<string>(this.backendAddress+"/corona_patients/update", patient)
  }
  get_all():Observable<Array<CoronaPatient>>
  {
    return this.http.get<Array<CoronaPatient>>(this.backendAddress+'/corona_patients')
  }

}
