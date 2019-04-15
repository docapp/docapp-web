import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AvailabilityService {
    
    constructor(private http: HttpClient) {}

    getAvailability(dni: string, date: string){
        return this.http.get("http://localhost:8080/ISST2019/api/availability?doc_dni="+dni +"&date="+date);
    }

}