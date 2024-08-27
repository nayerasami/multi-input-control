import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { IinputAttributes, Ioptions } from './Models/options';
import { CustomValidator } from '../../src/app/validators/customValidators'
import { ReusableInputControlComponent } from './Components/reusable-input-control/reusable-input-control.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'multi-input-control';
  @ViewChild('formInputControl') formInputControlRef !: ReusableInputControlComponent;
  inputControlFormArray: any;
  inputsAttributes: IinputAttributes[] = [
    {
      type: 'text',
      label: 'Company Name',
      name: 'companyName',
      inputType: 'text',
      validators: [
        Validators.minLength(4),
        Validators.required
      ],
      errorMessages: {
        required: 'Enter Valid Company name',
        minlength: 'company name must be at least 4'
      }
    },
    {

      type: 'date',
      label: 'Join Date',
      name: 'joinDate',
      inputType: 'text',
      validators: [
        Validators.required,
        CustomValidator.checkDateValidity
      ],
      errorMessages: {
        requiredMessage: 'Enter Valid join date',
        invalidDate: 'The date must be in the past'

      }
    },
    {
      type: 'date',
      label: 'End Date',
      name: 'endDate',
      inputType: 'text',
      validators: [
        CustomValidator.checkDateValidity

      ],
      errorMessages: {
        invalidDate: 'The date must be in the past'

      }
    }, {
      type: 'checkbox',
      label: 'experience',
      name: 'experience',
      inputType: 'checkbox',
      value: 'currently working',
      validators: [

      ],
      errorMessages: {

      }
    },
  ]


  options: Ioptions = {

    inputsArray: this.inputsAttributes,
    maxNumberOfControls: 5,
    formGroupValidators: [
      CustomValidator.checkEndDateAndJoinDate(),
      CustomValidator.checkWorkingStatus()
    ],
    errorMessages: {
      inappropriateDate: 'End date is set before the start date',
      requiredEndDate: 'You must enter the job status'
    },
    formArrayValidators: [CustomValidator.checkArrayMaxLength],
    formArrayErrors: {
      formArrayLength: "you can't add more "
    },

  }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    const controlsArray = this.formInputControlRef.inputControlForm.get('controlsArray') as FormArray;
    this.inputControlFormArray = controlsArray;
    console.log('Form Array', this.inputControlFormArray);
    this.handleExperienceStatus();


  }


  handleGroupValuesChange(group: any) {
    const currentlyWorkingControl = group?.get('experience');
    const endDateControl = group?.get('endDate');
    if (currentlyWorkingControl.value) {
      endDateControl.disable({ emitEvent: false });
    } else if (endDateControl.value) {
      currentlyWorkingControl.disable({ emitEvent: false });
    }

    currentlyWorkingControl?.valueChanges.subscribe((value: any) => {
      console.log("check value", value);

      if (value) {
        endDateControl?.disable({ emitEvent: false });
      } else {
        endDateControl?.enable({ emitEvent: false });
      }
    });

    endDateControl?.valueChanges.subscribe((value: any) => {
      if (value) {
        currentlyWorkingControl?.disable({ emitEvent: false });
      } else {
        currentlyWorkingControl?.enable({ emitEvent: false });
      }
      console.log("endDateControl value", value);
    });



  }

  handleExperienceStatus() {  
    if (this.inputControlFormArray) {
      this.inputControlFormArray.valueChanges.subscribe(() => {
        this.inputControlFormArray.controls.forEach((controlGroup: any) => {
          if (controlGroup instanceof FormGroup) {
            this.handleGroupValuesChange(controlGroup);

          }
        });
      })
    } else {
      console.log('no from array')
    }

  }




}
