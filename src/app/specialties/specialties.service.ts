import { Injectable } from "@angular/core";
import {Subject} from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class SpecialtiesService {
    
    constructor(private http: HttpClient) {}

    getSpecialties(){
        return this.http.get("http://localhost:8080/ISST2019/api/specialties");
    }



    
}