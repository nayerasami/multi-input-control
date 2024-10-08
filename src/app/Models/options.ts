export interface Ioptions {
    inputsArray: IinputAttributes[],
    maxNumberOfControls?: number,
    formGroupValidators?:any,
    errorMessages?:any,
    formArrayValidators:any,
    formArrayErrors:any ,
    defaultControlValues?:any    ,
    updatedDataValues?:any  

}

export interface IinputAttributes{

        type:string,
        label: string,
        name:  string,
        inputType: string,
        value?:string,
        validators?: any[],
        errorMessages?: {}
      

}