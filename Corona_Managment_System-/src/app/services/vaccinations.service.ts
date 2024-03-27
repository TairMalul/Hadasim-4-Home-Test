import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoronaPatient } from '../classes/coronaPatient';
import { Vaccination } from '../classes/vaccination';

@Injectable({
  providedIn: 'root'
})
export class VaccinationsService {

  backendAddress='http://127.0.0.1:5000'
  constructor(public http:HttpClient) { }
  get_by_id(id:string):Observable<Array<Vaccination>>
  {
    return this.http.get<Array<Vaccination>>(this.backendAddress+`/vaccinations/${id}`)
  }
  add_vaccination(vacc:Vaccination):Observable<string>
  {
    return this.http.post<string>(this.backendAddress+'/vaccinations/add', vacc)
  }
  delete_all_vacination_of_member(id:string):Observable<string>
  {
    return this.http.delete<string>(this.backendAddress+`/vaccinations/delete_all/${id}`)
  }
  get_all():Observable<Array<Vaccination>>
  {
    return this.http.get<Array<Vaccination>>(this.backendAddress+"/vaccinations")
  }

}
