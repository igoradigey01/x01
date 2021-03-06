import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { KatalogN } from 'src/app/core-nomenclature/_interfaces/katalog-n.model';
import { KatalogNService } from '../../shared/services/katalog-n.service';
import { Meta, Title } from '@angular/platform-browser';
import { NomenclatrueVarService } from '../../shared/services/nomenclature-var.service';
import { SEO_var } from 'src/app/shared/_interfaces/SEO-var.models';
import {BaseKatalogNComponent} from '../../shared/_class/base-katalog-n.component'


@Component({
  selector: 'app-katalog-n',
  templateUrl: './katalog-n.component.html',
  styleUrls: ['./katalog-n.component.scss']
})
export class KatalogNComponent extends BaseKatalogNComponent implements OnInit {



  _katalogNs: KatalogN[] | undefined;
  _categoriaN_name: string = '';



  constructor(

    public repository: KatalogNService,
    public route: ActivatedRoute,
    public router: Router,
    public meta: Meta,
    public titleMeta: Title,
    public sharedVar: NomenclatrueVarService

  ) {
    super(repository,route,router,sharedVar)
  }

  ngOnInit(): void {

       super.ngOnInit();

    if (this.sharedVar.SEO_let) this.LoadSEO(this.sharedVar.SEO_let);


    this.titleMeta.setTitle(this._categoriaN_name);
  }

  public onBackInNavBar() {
   // console.log(" onBackInNavBar")
    this.router.navigateByUrl('/content-n');

  }


 

  private LoadSEO(item: SEO_var) {

      if (item.decriptSEO) {
        this.meta.updateTag({ name: 'description', content: item.decriptSEO });
      }

  }

}
