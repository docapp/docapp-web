import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class LoginService {
    
    constructor(private http: HttpClient) {}

    login(dni, pass){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':'application/json; charset=utf-8'
            })
        };
        return this.http.post("http://localhost:8080/ISST2019/api/login?dni="+dni+"&password="+pass
        ,httpOptions);
    }

}