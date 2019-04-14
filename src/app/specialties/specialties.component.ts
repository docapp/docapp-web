import { Component, OnInit } from '@angular/core';
import {SpecialtiesService} from './specialties.service';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements OnInit {

  constructor(public specialtiesService: SpecialtiesService) { }

  private specialtiesSub : Subscription;
  specialties ;


  ngOnInit() {
    this.specialtiesService.getSpecialties().subscribe(response =>{
      this.specialties = response;
      console.log(this.specialties);
    });
  }

}
