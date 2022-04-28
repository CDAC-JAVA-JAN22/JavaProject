import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup,FormBuilder,Validators} from '@angular/forms';
import { FlightServiceService } from 'src/app/utility/flight-service.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.scss']
})
export class NewFlightComponent implements OnInit {
  actionBtn : string ="Save"
  
  
 flightForm !: FormGroup;
  allCompany: [] = [];
  companyData:any;

  constructor(private formBuilder : FormBuilder, private api : FlightServiceService, @Inject(MAT_DIALOG_DATA) public editData : any, private dialogRef: MatDialogRef<NewFlightComponent>) { }

  ngOnInit(): void {
   this.flightForm=this.formBuilder.group({
     company:['',Validators.required],
     flightNumber:['',Validators.required],
     noOfStops:['',Validators.required],
     stopName:['',Validators.required]
   });
   
   if(this.editData)
   {
     this.actionBtn='Update';
     this.flightForm.controls['company'].setValue(this.editData.company.companyName);
     this.flightForm.controls['flightNumber'].setValue(this.editData.flightNumber);
     this.flightForm.controls['noOfStops'].setValue(this.editData.noOfStops);
     this.flightForm.controls['stopName'].setValue(this.editData.stopName);

   }
   this.api.getCompany().subscribe({
     next:(res)=>{
        this.companyData=res;
        console.log(this.companyData)
        //this.allCompany=res.companyData
      
     }
   })
  }

  addFlight(){
   if(!this.editData)
   {
    if(this.flightForm.valid)
    {
      
      this.api.postFlight(this.flightForm.value)
      .subscribe({
        next:(res)=>{
          alert("Flight Added Succesfully");
          this.flightForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>
        {
          alert("Error While adding the flight")
        }
      })
    }
   }else{
     this.updateFlight()
   }
  }
  updateFlight()
  {
    console.log(this.editData.flightId);
    this.api.putFlight(this.flightForm.value,this.editData.flightId)
    .subscribe({
      next:(res:any)=>
      {
        
        alert("Flight Updated");
        this.flightForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>
        {
          alert("Error While updating the flight details.");
        }
    })
  }


}
