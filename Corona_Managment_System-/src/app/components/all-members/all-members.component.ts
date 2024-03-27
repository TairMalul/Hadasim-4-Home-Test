import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CoronaPatient } from 'src/app/classes/coronaPatient';
import { Member } from 'src/app/classes/member';
import { Vaccination } from 'src/app/classes/vaccination';
import { CoronaPatientsService } from 'src/app/services/corona-patients.service';
import { MembersService } from 'src/app/services/members.service';
import { VaccinationsService } from 'src/app/services/vaccinations.service';

@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.scss']
})
export class AllMembersComponent {

  constructor(public coronaPatientS: CoronaPatientsService, public vaccinationS: VaccinationsService,
    public router:Router, public memberS:MembersService, private readonly sanitizer: DomSanitizer, public http:HttpClient) {
  }

  current=new Member
  src:string | ArrayBuffer=""
  patient=new CoronaPatient()
  vaccinations:Array<Vaccination>=new Array<Vaccination>()
  members=new Array<Member>
  membersToShow=new Array<Member>

  ngOnInit():void{
    //קבלת כל חברי הקופ"ח מהשרת
    this.memberS.getAllUsers().subscribe(
      succ=>{
        this.members=succ
        this.membersToShow=succ
        console.log(this.members);
      }
    )
   

  }
  //פתיחת הפופאפ, קריאת נתונים רלוונטים מהשרת והצבתם במשתנים המתאימים 
  openPopup(m:Member)
  {
    this.http.get('http://127.0.0.1:5000'+`/get-image/${m.id}`, { 
      headers: { 'Content-Type': 'application/octet-stream'}, 
      responseType: 'blob'
    }).subscribe(
      (src) => {
       // Get the blob
       const reader = new FileReader();
       reader.readAsDataURL(src); 
       reader.onloadend = () => {
       // result includes identifier 'data:image/png;base64,' plus the base64 data
       if(reader.result!=null)
          this.src = reader.result
      }})
    this.current=m
    // this.src='../../../assets/photos/'+this.current.id+".png"
    this.coronaPatientS.get_by_id(this.current.id).subscribe(
      succ=>{
        console.log(succ);
        if(succ.id!=undefined)
          this.patient=succ
      },
      err=>{
       console.log(err);
      }
    )
  
    this.vaccinationS.get_by_id(this.current.id).subscribe(
      succ=>{
        console.log(succ);
        this.vaccinations=succ
      },
      err=>{
        console.log(err);
      }
    )
  }

  //בעת לחיצה על כפתור עדכון. ניווט לקומפוננטת עדכון
  update(){
    this.memberS.id_to_update=this.current.id
    this.router.navigateByUrl(`/update_member/0`)
    }

    //מחיקת חבר מהמערכת
    delete(){
      if(confirm(" האם אתה בטוח כי ברצונך להסיר את"+this.current.first_name+" "+this.current.last_name+"?")) {
        this.coronaPatientS.delete_corona_patient(this.current.id).subscribe(
          succ=>{console.log(succ);
          },
          err=>{console.log(err);
          }
        )
        this.vaccinationS.delete_all_vacination_of_member(this.current.id).subscribe(
          succ=>{console.log(succ);
          },
          err=>{console.log(err);
          }
        )
          this.memberS.deleteMember(this.current.id).subscribe(
            su=>{
              alert("נמחק בהצלחה")
              this.memberS.getAllUsers().subscribe(
                succ=>{
                  this.members=succ
                  this.membersToShow=succ
                  console.log(this.members);
                }
              )
              this.router.navigateByUrl(``)
            } ,
            err=>{console.log(err);
            }
          )
      }
      
      this.current.id=""
    }

  //פונקציית סינון וחיפוש
  search(event:any) {
    debugger
    this.membersToShow=this.members.filter((m)=>m.id.includes(event.target.value) || (m.first_name+m.last_name).includes(event.target.value))
  }
}
