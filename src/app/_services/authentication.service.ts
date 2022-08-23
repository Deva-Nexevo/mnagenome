import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        var curr = localStorage.getItem('currentUser')??'0';
        JSON.parse(curr);
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(curr));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {

        return this.http.post<any>(`${environment.apiUrl}/login`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next({});

        return this.http.post<any>(`${environment.apiUrl}/logout`, { })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response


            return user;
        }));
    }

   savedData(user:User){

    let curr = localStorage.getItem('currentUser')??'0';
    let auth_token = JSON.parse(curr).token;
    user.token=auth_token;
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
   }

   forgot(email: string) {

    return this.http.post<any>(`${environment.apiUrl}/resetPassword`, { email })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response


            return user;
        }));
}

reset(data:any) {

    return this.http.post<any>(`${environment.apiUrl}/password/reset`, { data })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response


            return user;
        }));
}

prelogin() {

    return this.http.post<any>(`${environment.apiUrl}/index`, {  })
        .pipe(map(user => {


            return user;
        }));
}


}
