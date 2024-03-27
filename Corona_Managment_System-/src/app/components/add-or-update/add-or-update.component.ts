import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Validators } from 'src/app/classes/Validators';
import { CoronaPatient } from 'src/app/classes/coronaPatient';
import { ImageFile } from 'src/app/classes/image';
import { Member } from 'src/app/classes/member';
import { Vaccination } from 'src/app/classes/vaccination';
import { CoronaPatientsService } from 'src/app/services/corona-patients.service';
import { MembersService } from 'src/app/services/members.service';
import { VaccinationsService } from 'src/app/services/vaccinations.service';

@Component({
  selector: 'app-add-or-update',
  templateUrl: './add-or-update.component.html',
  styleUrls: ['./add-or-update.component.scss'],
})
export class AddOrUpdateComponent {
  Validators = new Validators();
  doses = [false, false, false, false];
  corona_patient = [false, false];
  errors = false;
  added = false;
  image = new ImageFile();
  default_url: string | ArrayBuffer = '../../../assets/images/avatar.png';
  state = 0;
  member = new Member();
  coronaPatient = new CoronaPatient();
  vaccinatos = new Array<Vaccination>();
  allMembers = new Array<Member>();

  constructor(
    public memberS: MembersService,
    public coronaS: CoronaPatientsService,
    public vaccinationsS: VaccinationsService,
    public router: Router,
    private route: ActivatedRoute,
    public http: HttpClient
  ) {}

  // הגדרת משתנים לשדות הטופס
  formG: FormGroup = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    address: new FormControl(),
    id: new FormControl(),
    phonenumber: new FormControl(),
    mobilephone: new FormControl(),
    dose1_date: new FormControl(),
    dose1_manufacturer: new FormControl(),
    dose2_date: new FormControl(),
    dose2_manufacturer: new FormControl(),
    dose3_date: new FormControl(),
    dose3_manufacturer: new FormControl(),
    dose4_date: new FormControl(),
    dose4_manufacturer: new FormControl(),
    pos_date: new FormControl(),
    rec_date: new FormControl(),
  });

  //אתחול הטופס לפי הצורך
  ngOnInit(): void {
    //קבלת סוג טופס - הוספה או עדכון מהראוטר
    this.state = Number(this.route.snapshot.paramMap.get('state')!);
    //במקרה של עדכון:
    if (this.state == 0) {
      //ביטול גישה לשדה תעודת זהות
      this.formG.controls['id'].disable();
      var id = this.memberS.id_to_update;
      //שליפת החבר המתאים ועדכון שדות
      this.memberS.getMemberByID(id).subscribe((succ) => {
        this.member = succ;
        this.setFirstname = this.member.first_name;
        this.setLastname = this.member.last_name;
        this.setAddress = this.member.address;
        this.setPhonenumber = this.member.phone_number;
        this.setMobilephone = this.member.mobile_phone;
        this.setId = this.member.id;
        //שליפת תמונה מהשרת - אם יש
        this.http
          .get('http://127.0.0.1:5000' + `/get-image/${this.member.id}`, {
            headers: { 'Content-Type': 'application/octet-stream' },
            responseType: 'blob',
          })
          .subscribe((src) => {
            // Get the blob
            const reader = new FileReader();
            reader.readAsDataURL(src);
            reader.onloadend = () => {
              // result includes identifier 'data:image/png;base64,' plus the base64 data
              if (reader.result != null) this.default_url = reader.result;
            };
          });
      });
      //שליפת נתוני היסטוריית קורנה , אם יש ועדכון שדות
      this.coronaS.get_by_id(id).subscribe((succ) => {
        debugger;
        if (succ.id == this.member.id) {
          this.coronaPatient = succ;
          this.corona_patient[0] = true;
          this.setPos_date = this.coronaPatient.diagnose_date;
          let element = <HTMLInputElement>document.getElementById('pos');
          element.checked = true;
          this.corona_patient[1] = true;
          this.setRec_date = this.coronaPatient.recovery_date;
          this.formG.controls['pos_date'].disable();
          if (this.coronaPatient.recovery_date != '--/--/----')
            this.formG.controls['rec_date'].disable();
        }
      });
      //שליפת חיסונים אם יש, ועדכון שדות
      this.vaccinationsS.get_by_id(id).subscribe((succ) => {
        this.vaccinatos = succ;
        var i = 0;
        this.vaccinatos.forEach((v) => {
          if (1 == v.dose_number) {
            let element = <HTMLInputElement>document.getElementById('dose_1');
            element.checked = true;
            this.doses[0] = true;
            this.setDose1_date = v.date;
            this.setDose1_manufacturer = v.manufacturer;
            //חסימת גישת עידכון לחיסונים שבוצעו
            this.formG.controls['dose1_date'].disable();
            this.formG.controls['dose1_manufacturer'].disable();
          } else if (2 == v.dose_number) {
            let element = <HTMLInputElement>document.getElementById('dose_2');
            element.checked = true;
            this.doses[1] = true;
            this.setDose2_date = v.date;
            this.setDose2_manufacturer = v.manufacturer;
            this.formG.controls['dose2_date'].disable();
            this.formG.controls['dose2_manufacturer'].disable();
          } else if (3 == v.dose_number) {
            let element = <HTMLInputElement>document.getElementById('dose_3');
            element.checked = true;
            this.doses[2] = true;
            this.setDose3_date = v.date;
            this.setDose3_manufacturer = v.manufacturer;
            this.formG.controls['dose3_date'].disable();
            this.formG.controls['dose3_manufacturer'].disable();
          } else if (4 == v.dose_number) {
            let element = <HTMLInputElement>document.getElementById('dose_4');
            element.checked = true;
            this.doses[3] = true;
            this.setDose4_date = v.date;
            this.setDose4_manufacturer = v.manufacturer;
            this.formG.controls['dose4_date'].disable();
            this.formG.controls['dose4_manufacturer'].disable();
          }
        });
      });
      console.log(this.member);
    }
     else //שליפת כל חברי הקופה - כדי לוודא שתעודת הזהות אכן חדשה - במקרה של הוספה
    {
      this.memberS.getAllUsers().subscribe((succ) => {
        this.allMembers = succ;
      });
    }
  }

  // getters and setters
  get getFirstname() {
    return this.formG.controls['firstname'].value;
  }
  set setFirstname(name: string) {
    this.formG.controls['firstname'].setValue(name);
  }
  get getLastname() {
    return this.formG.controls['lastname'].value;
  }
  set setLastname(name: string) {
    this.formG.controls['lastname'].setValue(name);
  }
  get getAddress() {
    return this.formG.controls['address'].value;
  }
  set setAddress(address: string) {
    this.formG.controls['address'].setValue(address);
  }
  get getId() {
    return this.formG.controls['id'].value;
  }
  set setId(id: string) {
    this.formG.controls['id'].setValue(id);
  }
  get getPhonenumber() {
    return this.formG.controls['phonenumber'].value;
  }
  set setPhonenumber(phonenumber: string) {
    this.formG.controls['phonenumber'].setValue(phonenumber);
  }
  get getMobilephone() {
    return this.formG.controls['mobilephone'].value;
  }
  set setMobilephone(mobilephone: string) {
    this.formG.controls['mobilephone'].setValue(mobilephone);
  }
  get getDose1_date() {
    return this.formG.controls['dose1_date'].value;
  }
  set setDose1_date(dose1_date: string) {
    this.formG.controls['dose1_date'].setValue(dose1_date);
  }
  get getDose1_manufacturer() {
    return this.formG.controls['dose1_manufacturer'].value;
  }
  set setDose1_manufacturer(dose1_manufacturer: string) {
    this.formG.controls['dose1_manufacturer'].setValue(dose1_manufacturer);
  }
  get getDose2_date() {
    return this.formG.controls['dose2_date'].value;
  }
  set setDose2_date(dose2_date: string) {
    this.formG.controls['dose2_date'].setValue(dose2_date);
  }
  get getDose2_manufacturer() {
    return this.formG.controls['dose2_manufacturer'].value;
  }
  set setDose2_manufacturer(dose2_manufacturer: string) {
    this.formG.controls['dose2_manufacturer'].setValue(dose2_manufacturer);
  }
  get getDose3_date() {
    return this.formG.controls['dose3_date'].value;
  }
  set setDose3_date(dose3_date: string) {
    this.formG.controls['dose3_date'].setValue(dose3_date);
  }
  get getDose3_manufacturer() {
    return this.formG.controls['dose3_manufacturer'].value;
  }
  set setDose3_manufacturer(dose3_manufacturer: string) {
    this.formG.controls['dose3_manufacturer'].setValue(dose3_manufacturer);
  }
  get getDose4_date() {
    return this.formG.controls['dose4_date'].value;
  }
  set setDose4_date(dose4_date: string) {
    this.formG.controls['dose4_date'].setValue(dose4_date);
  }
  get getDose4_manufacturer() {
    return this.formG.controls['dose4_manufacturer'].value;
  }
  set setDose4_manufacturer(dose4_manufacturer: string) {
    this.formG.controls['dose4_manufacturer'].setValue(dose4_manufacturer);
  }
  get getPos_date() {
    return this.formG.controls['pos_date'].value;
  }
  set setPos_date(pos_date: string) {
    this.formG.controls['pos_date'].setValue(pos_date);
  }
  get getRec_date() {
    return this.formG.controls['rec_date'].value;
  }
  set setRec_date(rec_date: string) {
    this.formG.controls['rec_date'].setValue(rec_date);
  }


//בדיקת תקינות לכל שדות הטופס
  validForm() {
    debugger;
    if (
      this.Validators.validName(this.getFirstname) &&
      this.Validators.validName(this.getLastname) &&
      this.Validators.validaddress(this.getAddress) &&
      this.Validators.validiD(this.getId) &&
      this.Validators.validPhoneNumber(this.getPhonenumber) &&
      this.Validators.validPhoneNumber(this.getMobilephone)
    ) {
      if (
        this.doses[0] &&
        this.Validators.required(this.getDose1_manufacturer) &&
        this.formG.controls['dose1_date'].untouched
      )
        return false;
      if (
        this.doses[1] &&
        this.Validators.required(this.getDose2_manufacturer) &&
        this.formG.controls['dose2_date'].untouched
      )
        return false;
      if (
        this.doses[2] &&
        this.Validators.required(this.getDose3_manufacturer) &&
        this.formG.controls['dose3_date'].untouched
      )
        return false;
      if (
        this.doses[3] &&
        this.Validators.required(this.getDose4_manufacturer) &&
        this.formG.controls['dose4_date'].untouched
      )
        return false;
      if (
        this.corona_patient[0] &&
        this.state != 0 &&
        this.formG.controls['pos_date'].untouched &&
        this.formG.controls['rec_date'].untouched
      )
        return false;
      return true;
    }
    return false;
  }

//הוספה או עדכון של חיסונים לחבר
  addOrUpdateVaccinations() {
    var vvaccinations = [];
    if (this.doses[0]) {
      var a = new Vaccination();
      a.dose_number = 1;
      a.date = this.getDose1_date;
      a.manufacturer = this.getDose1_manufacturer;
      vvaccinations.push(a);
      if (this.doses[1]) {
        var b = new Vaccination();
        b.dose_number = 2;
        b.date = this.getDose2_date;
        b.manufacturer = this.getDose2_manufacturer;
        vvaccinations.push(b);
        if (this.doses[2]) {
          var c = new Vaccination();
          c.dose_number = 3;
          c.date = this.getDose3_date;
          c.manufacturer = this.getDose3_manufacturer;
          vvaccinations.push(c);
          if (this.doses[3]) {
            var d = new Vaccination();
            d.dose_number = 4;
            d.date = this.getDose4_date;
            d.manufacturer = this.getDose4_manufacturer;
            vvaccinations.push(d);
          }
        }
      }
    }
    if (this.state == 0) {
      this.vaccinationsS
        .delete_all_vacination_of_member(this.member.id)
        .subscribe(
          (succ) => {
            console.log(succ);
          },
          (err) => {
            console.log(err);
          }
        );
    }
    if (this.state == 0 || this.state == 1) {
      vvaccinations.forEach((x) => {
        x.patient_id = this.getId;
        this.vaccinationsS.add_vaccination(x).subscribe(
          (succ) => {
            console.log(succ);
            ('hhhhhh');
          },
          (err) => {
            console.log(err);
          }
        );
      });
    }
  }

//הוספה או עדכון של היסטוריית קורנה לחבר
  addOrUpdateCoronaPatient() {
    if (this.state == 0 && this.coronaPatient.id != undefined) {
      this.coronaPatient.diagnose_date = this.getPos_date;
      this.coronaPatient.recovery_date = this.getRec_date;
      this.coronaPatient.id = this.getId;
      this.coronaS.update_corona_patient(this.coronaPatient).subscribe(
        (succ) => {
          console.log(succ);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      if (this.corona_patient[0]) {
        var patient = new CoronaPatient();
        patient.id = this.getId;
        patient.diagnose_date = this.getPos_date;
        if (this.getRec_date) patient.recovery_date = this.getRec_date;
        else patient.recovery_date = '--/--/----';

        this.coronaS.add_corona_patient(patient).subscribe(
          (succ) => {
            console.log(succ);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  }

//הוספה או עדכון פרטיים אישיים של חבר
  addOrUpdateMember() {
    var newMenber = new Member();
    newMenber.id = this.getId;
    newMenber.first_name = this.getFirstname;
    newMenber.last_name = this.getLastname;
    newMenber.address = this.getAddress;
    newMenber.phone_number = this.getPhonenumber;
    newMenber.mobile_phone = this.getMobilephone;
    if (this.state == 1) {
      if (this.allMembers.filter((v) => v.id == this.getId).length != 0) {
        alert('משתמש בעל תעודת הזהות שהוזנה קיים');
      } else {
        this.memberS.addMember(newMenber).subscribe((succ) => {
          this.memberS.uploadImage(this.getId, this.image).subscribe((succ) => {
            this.added = true;
            this.addOrUpdateCoronaPatient();
            this.addOrUpdateVaccinations();
          });
        });
      }
    } else if (this.state == 0) {
      this.memberS.updateMember(newMenber).subscribe((succ) => {
        debugger;
        this.addOrUpdateCoronaPatient();
        this.addOrUpdateVaccinations();
        console.log(succ);
        this.added = true;
      });
      this.memberS.uploadImage(this.getId, this.image).subscribe((succ) => {
        console.log(succ);
      });
    }
  }

  //פונקציה הנקראת בעת שליחת הטופס. מוודאת תקינות ואם כן מעבירה לביצוע לפונקציות משנה
  onSubm() {
    if (this.validForm()) {
      this.addOrUpdateMember();
    } else {
      this.errors = true;
    }
  }

  //העלאת תמונה ושמירתה כקובץ
  processFile(event: any) {
    const formData = new FormData();
    debugger;
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = new ImageFile(event.target.files[0], reader.result);
      console.log(this.image);
      this.default_url = '';
    };
  }

  //פונקציה מסדרת לכפתורי check בטופס
  check(num: number) {
    if (num < 5) this.doses[num - 1] = !this.doses[num - 1];
    else if (num == 5) this.corona_patient[0] = !this.corona_patient[0];
    else if ((num = 6)) this.corona_patient[1] = !this.corona_patient[1];
  }
}
