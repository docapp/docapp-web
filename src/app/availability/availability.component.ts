import {Component, ChangeDetectionStrategy, OnInit,   ViewEncapsulation} from '@angular/core';
import {AvailabilityService} from './availability.service';
import { ActivatedRoute, Router } from '@angular/router';
import {DatePipe} from '@angular/common';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  addWeeks,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  subWeeks
} from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarView, CalendarMonthViewDay} from 'angular-calendar';

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
type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths
  }[period](date, amount);
}
function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth
  }[period](date);
}

@Component({
  selector: 'app-availability',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AvailabilityComponent implements OnInit{
  constructor(public availabilityService: AvailabilityService, private route: ActivatedRoute,
    private router : Router,
    private datePipe: DatePipe) {
      this.dateOrViewChanged();
    }

  available;
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
  minDateInput = new Date();
  dni = '';
  refresh: Subject<any> = new Subject();
  view: CalendarPeriod = CalendarView.Month;
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
  minDate: Date = subMonths(new Date(), 0);
  maxDate: Date = addMonths(new Date(), 3);
  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;
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

  // Create an appointment
  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event);
    var m = event.end.getMonth();
    m++;
    var month = m.toString();
    var day = event.start.getDate().toString();
    if(month.length==1){
      month = "0"+month;
    }
    if(day.length==1){
      day = "0"+day;
    }
    var indextime = this.time.findIndex(x=>x==event.title);
    var date = event.start.getFullYear()+"-"+month+"-"+day;
    console.log(date);
    this.availabilityService.addAppointment(this.dni,'12312312A',indextime,date);
    var first = true;
    setInterval(() => {
      if(first){
        this.router.navigateByUrl('/appointments');
        first = false;
      }
     }, 1000);
  }

  increment(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }
  changeView(view: CalendarPeriod): void {
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
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
