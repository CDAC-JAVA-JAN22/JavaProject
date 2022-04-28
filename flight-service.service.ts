import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightServiceService {

  constructor(private http : HttpClient) { }

  postFlight(data : any)
  {
    console.log(data)
    return this.http.post<any>("http://localhost:8084/addFlight/",data);
  }
  getFlight()
  {
    return this.http.get<any>("http://localhost:8084/showAllFlights/");
  }
  putFlight(data :any,id:number)
  { 
    console.log("id "+id);
    console.log(data);
    return this.http.put<any>("http://localhost:8084/updateFlight/"+id,data)
  }
  deleteFlight(id:number)
  {
    return this.http.delete<any>("http://localhost:8084/removeFlight/"+id);
  }

  postSchedule(data : any)
  {
    console.log(data);
    return this.http.post<any>("http://localhost:8084/addSchedule/",data);
  }
  getSchedule()
  {
    return this.http.get<any>("http://localhost:8084/showAllSchedule/");
  }
  putSchedule(data :any,id:number)
  {
    return this.http.put<any>("http://localhost:8084/updateSchedule/"+id,data)
  }
  deleteSchedule(id:number)
  {
    console.log("id "+id);
    return this.http.delete<any>("http://localhost:8084/removeSchedule/"+id);
  }

  postPrice(data : any)
  {
    return this.http.post<any>("http://localhost:3000/priceList/",data);
  }
  putPrice(data :any,id:number)
  {
    return this.http.put<any>("http://localhost:3000/priceList/"+id,data)
  }
  getCompany()
  {
    return this.http.get<any>("http://localhost:8084/getAllCompany/");
  }
  


}
