import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root'})
export class PlatformService {

  public constructor(@Inject(PLATFORM_ID) readonly platformId: Object) {}

  public isPlatformServer(): boolean {
    return !isPlatformBrowser(this.platformId);
  }

}
