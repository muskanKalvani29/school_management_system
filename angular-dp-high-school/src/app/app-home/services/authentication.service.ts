import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  LOCAL_STORAGE_ATTRIBUTE_USERNAME:string = "SMSAuthenticateduUser"
  public username: String;
  public password: String;

  constructor(private http : HttpClient) { }

  loginAuthentication(username:String,password:String)
  {
    let header = {
      headers: new HttpHeaders
      ({
        'Content-Type': "application/json",
        'authorization':'Basic ' + btoa(username + ":" + password)
      })
    }  
      //return valu lakhvanu dhrumil mathi
      return this.http.get(`${"http://localhost:8080/sms/parents?page=0"}`,header)
      .pipe(map((res)=>
      {
        console.log(res);
        this.sucessfullyLogin(username,password)
      }));
    
  }

  createToken(username:String,password:String)
  {
    return 'Basic' + btoa(username+":"+password)
  }

  sucessfullyLogin(username,password)
  {
    localStorage.setItem(this.LOCAL_STORAGE_ATTRIBUTE_USERNAME,btoa(username)+" "+btoa(password))
  }

  isUserLoggedIn(): boolean
  {
    console.log(this.username)
    console.log(this.password)
    let user = localStorage.getItem(this.LOCAL_STORAGE_ATTRIBUTE_USERNAME)

    if(user == null)
    {
      return false;
    }
    return true;
  }

  logOut()
  {
    this.username = null;
    this.password = null;
    localStorage.removeItem(this.LOCAL_STORAGE_ATTRIBUTE_USERNAME)
  }
}


