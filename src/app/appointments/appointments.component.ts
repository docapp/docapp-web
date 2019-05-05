import { Component, OnInit } from '@angular/core';
import {AppointmentsService} from './appointments.service';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointments;
  time = [
    "9:00-9:30",
    "9:30-10:00",
    "10:00-10:30",
    "10:30-11:00",
    "11:00-11:30",
    "11:30-12:00",
    "12:00-12:30",
    "12:30-13:00",
    "13:00-13:30",
    "13:30-14:00"
  ];
  constructor(public appointmentsService: AppointmentsService) { }


  ngOnInit() {
    this.appointmentsService.getAppointments().subscribe(response=>{
      this.appointments= response;
      console.log(this.appointments);
    });
  }

  confirmClick(id){
    this.appointmentsService.confirmPresence(id);
    var first = true;
    setInterval(() => {
      if(first){
        this.ngOnInit();
        first = false;
      }
     }, 1000);
  }

}
