import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AppointmentsService {
    
    constructor(private http: HttpClient) {}

    

    getAppointments(){
        return this.http.get("http://localhost:8080/ISST2019/api/doc-appointment?dni=45613167G");
    }
    confirmPresence(id){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':'application/json; charset=utf-8'
            })
        };
        return this.http.post("http://localhost:8080/ISST2019/api/presence?id="+id,httpOptions)
        .subscribe(
            res => {
              console.log(res);
            },
            err=> {
            }
          );
    }

}