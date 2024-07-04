import { Injectable } from '@angular/core';

@Injectable()
export class AppInit {

  constructor() {
  }


  public async Init(): Promise<void> {
    return new Promise<void>(async (resolve) => {
      resolve();
    });
  }


}


