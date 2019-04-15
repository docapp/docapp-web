import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {AvailabilityService} from './availability.service';
import { ActivatedRoute } from '@angular/router';
import {DatePipe} from '@angular/common';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarView} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-availability',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit{
  constructor(public availabilityService: AvailabilityService, private route: ActivatedRoute,
    private datePipe: DatePipe) {}

  available;
  minDate = new Date();
  dni = '';
  refresh: Subject<any> = new Subject();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
      }
    }
  ];

  events: CalendarEvent[] = [
  ];

  ngOnInit(){
    this.route.queryParamMap.subscribe(params => {
      this.dni = params.get('dni');
    });
    
  }

  

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }



  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event);
  }

  availabilityFromDate(event, fromCalendarClick){
    var chosenDate = event.date;
    if(!fromCalendarClick){
      chosenDate = event.value;
    }
    var formattedDate = this.datePipe.transform(chosenDate,"yyyy-MM-dd");
    this.availabilityService.getAvailability(this.dni, formattedDate).subscribe(response =>{
      this.available = response;
      this.events = [];
      for (var key in this.available) {
        var start = this.available[key].split('-')[0];
        var end = this.available[key].split('-')[1];
        var startString = '';
        var endString= '';
        if (start.length==4){
          startString = formattedDate+'T0'+start;
        } else{
          startString = formattedDate+'T'+start;
        }
        if (end.length==4){
          endString = formattedDate+'T0'+end;
        } else{
          endString = formattedDate+'T'+end;
        }        
        let startDate= new Date(startString);
        let endDate= new Date(endString);
        this.events = [
          ...this.events,
          {
            title: this.available[key],
            start: startDate,
            end: endDate,
            color: colors.blue,
            draggable: false,
            resizable: {
              beforeStart: true,
              afterEnd: true
            }
          }
        ];
      }
      this.refresh.next();
      this.dayClicked(event);
    });
    
  }
}
