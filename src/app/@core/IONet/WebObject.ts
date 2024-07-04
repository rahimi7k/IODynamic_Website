import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class WebObject {

}

export namespace WebObject {


  export class EmailSupport {
    public header: string;
    public message: string;
    public application: string;
    public version: string;
    public os: string;
    public name: string;
    public email: string;
    public captcha: string;
  }

  export class EmailSupportResponse {
    public ok: boolean;
    public description: string;
  }

  export class GetStorePackage {
    public language: string;
    public os: string;
    public app: string;
  }

}


