import {Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {AvailabilityService} from './availability.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(public availabilityService: AvailabilityService, private route: ActivatedRoute) {}

  available;
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
      var dni = params.get('dni');
      this.availabilityService.getAvailability(dni).subscribe(response =>{
        this.available = response;
      });
    });
    
  }

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = false;

  

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

  availabilityFromDate(){
    for (var key in this.available) {
      var start = this.available[key].split('-')[0];
      var end = this.available[key].split('-')[1];
      let startString = '2019-04-26T'+start;
      let endString = '2019-04-26T'+end;
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
    this.activeDayIsOpen = false;
  }
}
