import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Header {

  public static sideBarButtonElement: HTMLElement;
  public static menuElement: HTMLElement;
  public static sideBarStatus: string = "";
  public static sideBarOldStatus: string = "";
}
