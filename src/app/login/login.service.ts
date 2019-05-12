import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Subject }    from 'rxjs';


@Injectable({ providedIn: "root" })
export class LoginService {
    
    constructor(private http: HttpClient) {}

    private nameSource = new Subject<string>();
    private surnameSource = new Subject<string>();
    private dniSource = new Subject<string>();


    name$ = this.nameSource.asObservable();
    surname$ = this.surnameSource.asObservable();
    dni$ = this.surnameSource.asObservable();


    changeUser(name: string, surname: string, dni: string) {
        this.nameSource.next(name);
        this.surnameSource.next(surname);
        this.dniSource.next(surname);
    }

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