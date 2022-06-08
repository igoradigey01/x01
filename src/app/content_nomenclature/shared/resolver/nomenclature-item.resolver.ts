import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable,forkJoin, of } from 'rxjs';
import {NomenclatureService} from './../services/nomenclature.servise'
import { SharedVarService } from 'src/app/_shared/services/shared-var.service';

@Injectable()
export class NomenclatureItemResolver implements Resolve<any> {

  constructor(
    private repository:NomenclatureService,
    private sharedVar: SharedVarService
    ) {

  }


  resolve(): Observable<any> {

    // const articles = this.repository.ArticleNs;
    // const brands = this.repository.BrandNs;
    // const colors = this.repository.ColorNs;
    this.repository.ArticleNs().subscribe((data) => {
      this.sharedVar.ArticleNs = data;
    });
    this.repository.ColorNs().subscribe((data) => {
      this.sharedVar.ColorNs = data;
    });
    this.repository.BrandNs().subscribe((data) => {
      this.sharedVar.BrandNs = data;
      console.log("NomemclatureItem -- BrandNs.lenght---ngOnInit"+this.sharedVar.ColorNs.length)

    });

    return  of( true);
    //return of(true);
  }
}
