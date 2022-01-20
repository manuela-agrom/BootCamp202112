import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityModule } from '../security';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    SecurityModule,
    CommonModule,
  ]
})
export class MainModule {
  constructor( @Optional() @SkipSelf() parentModule: MainModule) {
    if (parentModule) {
      const msg = `MainModule has already been loaded.
        Import MainModule once, only, in the root AppModule.`;
      throw new Error(msg);
    }
  }
}
