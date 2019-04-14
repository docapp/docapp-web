import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AvailabilityService {
    
    constructor(private http: HttpClient) {}

    getAvailability(){
        return this.http.get("http://localhost:8080/ISST2019/api/availability?doc_dni=28162062&date=2019-04-26");
    }

}