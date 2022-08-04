import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/app-home/services/authentication.service';

@Injectable()
export class httpinterceptor implements HttpInterceptor
{
    constructor(private _auth:AuthenticationService){}
    intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
        if(this._auth.isUserLoggedIn())
        {
            let token = localStorage.getItem(this._auth.LOCAL_STORAGE_ATTRIBUTE_USERNAME)
            let string = token.split(" ");
            console.log(req.url);
            req = req.clone({
                setHeaders:
                {
                    'authorization':"Basic "+ btoa(atob(string[0]) + ":" + atob(string[1])) 
                }
            })
        }
        return next.handle(req);
    }
}