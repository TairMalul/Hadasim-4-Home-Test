import { Component,OnInit } from '@angular/core';
import { range } from 'rxjs';
import { CoronaPatient } from 'src/app/classes/coronaPatient';
import { Member } from 'src/app/classes/member';
import { Vaccination } from 'src/app/classes/vaccination';
import { CoronaPatientsService } from 'src/app/services/corona-patients.service';
import { MembersService } from 'src/app/services/members.service';
import { VaccinationsService } from 'src/app/services/vaccinations.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts'
import { registerLicense } from '@syncfusion/ej2-base';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import {
    Chart, SplineSeries, ChartAnnotation, Category,
    Legend, Tooltip, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-charts';
Chart.Inject(SplineSeries, Category, Legend, Tooltip, ChartAnnotation);

registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx1WmFZfVpgfV9CYFZTQGYuP1ZhSXxXdkZhXn9XdHRXQmhcVUI");


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']

})
export class StatsComponent {

  constructor(public VaccinationS:VaccinationsService, public membersS:MembersService,public coronaS:CoronaPatientsService) {}
  vaccinations=new Array<Vaccination>
  members=new Array<Member>
  coronaPatients=new Array<CoronaPatient>
  activeEachDay=[{"x":new Date().toString(),"y":0}]
  precentage="0"
  dose1=0
  dose2=0
  dose3=0
  dose4=0

  //קריאת נתונים מהשרת - חברי הקופה, חיסונים, וחולי קורונה
  ngOnInit():void{
    this.VaccinationS.get_all().subscribe(
          succ=>{
            this.vaccinations=succ
            console.log(succ);
          }
        )
        this.membersS.getAllUsers().subscribe(
          succ=>{
            this.members=succ
            console.log(succ);
            this.precentageVaccinated()
          }
        )
        this.coronaS.get_all().subscribe(
          succ=>{
            this.coronaPatients=succ
            console.log(succ);
            this.activeCoronaInfectedMembers()
            this.chart()
          }
        )
      
    
  }

  precentageVaccinated(){
  //חישוב אחוז הלא מחוסנים
    var vaccinated=this.vaccinations.filter((v)=>v.dose_number==1)
    console.log(`precentage vaccinated: ${vaccinated.length/(this.members.length/100)}%`);
    this.precentage=(100-(vaccinated.length/(this.members.length/100))).toFixed(2)

    //מניית מספר המחוסנים בכל מנת חיסון
    this.dose1=this.vaccinations.filter((v)=> v.dose_number==1).length
    this.dose2=this.vaccinations.filter((v)=> v.dose_number==2).length
    this.dose3=this.vaccinations.filter((v)=> v.dose_number==3).length
    this.dose4=this.vaccinations.filter((v)=> v.dose_number==4).length
  }

  //חישוב כמות חולים מאומתים בכל יום מ30 הימים האחרונים
  activeCoronaInfectedMembers()
  {
    let now = new Date()
    console.log('Today: ' + now.toUTCString())
    var last30days=(new Date(now.setDate(now.getDate() - 30)))

    var arr=[]
    var date=new Date(now.setDate(now.getDate()))
    for (var i=0;i<30;i++)
    {
      date=new Date(date.setDate(date.getDate()+1));
      // console.log(date);
      var dates=date.getDate()+"/"+(date.getMonth()+1)
      arr.push({ "x":dates,"y":this.coronaPatients.filter((c)=>new Date(c.diagnose_date)<=date&&c.recovery_date=="--/--/----" || new Date(c.diagnose_date)<=date&&new Date(c.recovery_date)>date).length})
    }
    console.log(arr);
    this.activeEachDay.pop()
    this.activeEachDay=arr
  }

  //אתחול גרף
  chart()
  {
    let chart: Chart = new Chart({

      //Initializing Primary X Axis
      primaryXAxis: {
          valueType: 'Category',
          interval: 1, majorGridLines: { width: 0 },
          labelIntersectAction: 'Rotate90'
      },
      chartArea: {
          border: {
              width: 0
          }
      },
  
      //Initializing Primary Y Axis
      primaryYAxis:
      {
          labelFormat: '{value}',
          lineStyle: { width: 0 },
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 }
      },
  
      //Initializing Chart Series
      series: [
          {
              type: 'Spline',
              dataSource:this.activeEachDay,
              xName: 'x', width: 2, marker: {
                  visible: false,
                  width: 10,
                  height: 10
              },
              yName: 'y', name: 'חולים פעילים', fill: '#0450C2',
          },
      ],
  
      //Initializing Chart title
      //title: 'NC Weather Report - 2016',
      //Initializing User Interaction Tooltip
      tooltip: { enable: true },
      legendSettings: { visible: false },
      height: '350',
      load: (args: ILoadedEventArgs) => {
          let selectedTheme: string = location.hash.split('/')[1];
          selectedTheme = selectedTheme ? selectedTheme : 'Material';
          args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
      }
  });
  chart.appendTo('#Chart');  
  }
}             

