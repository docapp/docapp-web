import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AvailabilityService {
    
    constructor(private http: HttpClient) {}

    getAvailability(dni: string, date: string){
        return this.http.get("http://localhost:8080/ISST2019/api/availability?doc_dni="+dni +"&date="+date);
    }

    addAppointment(doc_dni, pat_dni, start_time, date){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':'application/json; charset=utf-8'
            })
        };
        return this.http.post("http://localhost:8080/ISST2019/api/new-appointment?doc_dni="+doc_dni+"&pat_dni="+pat_dni+"&start_time="+start_time+"&date="+date
        ,httpOptions)
        .subscribe(
            res => {
              console.log(res);
            },
            err=> {
            }
          );
    }

}