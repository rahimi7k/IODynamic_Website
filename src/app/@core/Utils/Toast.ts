import { Injectable } from '@angular/core';

/*
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';
*/

@Injectable({
  providedIn: 'root',
})
export class ToastDeprecated {


  /*
  public static toastService: NbToastrService;
  private config: NbToastrConfig;
  private static index = 1;

  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];
  positions: string[] = [
    NbGlobalPhysicalPosition.TOP_RIGHT,
    NbGlobalPhysicalPosition.TOP_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    NbGlobalLogicalPosition.TOP_END,
    NbGlobalLogicalPosition.TOP_START,
    NbGlobalLogicalPosition.BOTTOM_END,
    NbGlobalLogicalPosition.BOTTOM_START,
  ];
  */






  /*
  public static show(title: string, body: string, type: NbComponentStatus, closeByClick?: boolean) {
    closeByClick == null ? true : closeByClick;
    const config = {
      status: type,
      destroyByClick: closeByClick,
      duration: 40000,
      hasIcon: false,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: true,
    };
    const titleContent = title ? `${title}` : '';

    Toast.index += 1;
    Toast.toastService.show(
      body,
      `${titleContent}`,
      config);
  }
  */



}
