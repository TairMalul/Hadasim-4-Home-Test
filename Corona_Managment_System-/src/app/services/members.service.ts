


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../classes/member';
import { ImageFile } from '../classes/image';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  backendAddress='http://127.0.0.1:5000'
  constructor(public http:HttpClient) { }
  id_to_update=""


  addMember(json:object):Observable<Member>
  {
    const formData: FormData = new FormData();
    return this.http.post<Member>(this.backendAddress+"/member/add",json)
  }

  getAllUsers():Observable<Array<Member>>
  {
    return this.http.get<Array<Member>>(this.backendAddress+"/members")
  }
  deleteMember(id:string):Observable<string>{
    return this.http.delete<string>(this.backendAddress+`/member/delete/${id}`)
  }
  getMemberByID(id:string):Observable<Member>
  {
    return this.http.get<Member>(this.backendAddress+`/member/${id}`)
  }
  updateMember(member:Member):Observable<string>
  {
    return this.http.put<string>(this.backendAddress+'/member/update',member)
  }
  addMemberImage(id:string,file:ImageFile):Observable<string>
  {
    const formData = new FormData();
    formData.append('file', file.file!);
    return this.http.post<string>(this.backendAddress+`/member/upload_image/${id}`,formData)
  }
  getImage(id:string):Observable<File>
  {
    return this.http.get<File>(this.backendAddress+`/get-image/${id}`)
  }
  uploadImage(id:string,file:ImageFile):Observable<string>
  {
    const formData = new FormData();
    formData.append('file', file.file!);
    return this.http.post<string>(this.backendAddress+`/member_1/upload_image/${id}`,formData)
  }

  

}
