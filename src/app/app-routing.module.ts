import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialtiesComponent } from "./specialties/specialties.component";
import { AppointmentsComponent } from "./appointments/appointments.component";
import { LoginComponent } from "./login/login.component";

import { AvailabilityComponent } from "./availability/availability.component";



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'especialidades', component: SpecialtiesComponent },
  { path: 'citas', component: AppointmentsComponent },
  { path: 'disponibilidad', component: AvailabilityComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
