import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Subject }    from 'rxjs';


@Injectable({ providedIn: "root" })
export class LoginService {
    
    constructor(private http: HttpClient) {}

    private nameSource = new Subject<string>();
    private surnameSource = new Subject<string>();
    private dniSource = new Subject<string>();
    private roleSource = new Subject<string>();


    name$ = this.nameSource.asObservable();
    surname$ = this.surnameSource.asObservable();
    dni$ = this.dniSource.asObservable();
    role$ = this.roleSource.asObservable();


    name ;
    surname;
    dni;
    role;


    changeUser(name: string, surname: string, dni: string, role:string) {
        this.nameSource.next(name);
        this.surnameSource.next(surname);
        this.dniSource.next(dni);
        this.roleSource.next(role);
        this.name= name;
        this.surname = surname;
        this.dni = dni;
        this.role = dni;
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

    getUser(){
        return {name:this.name, surname: this.surname, dni: this.dni, role: this.role};
    }


}