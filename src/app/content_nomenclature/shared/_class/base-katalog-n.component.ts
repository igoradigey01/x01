import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { KatalogN } from 'src/app/core-nomenclature/_interfaces/katalog-n.model';
import { KatalogNService } from '../services/katalog-n.service';
import { Meta, Title } from '@angular/platform-browser';
import { NomenclatrueVarService } from '../services/nomenclature-var.service';
import { SEO_var } from 'src/app/shared/_interfaces/SEO-var.models';



@Component({
  selector: 'app-base-katalog-n',
  template: ``,
  styleUrls: []
})
export class BaseKatalogNComponent implements OnInit {



  _katalogNs: KatalogN[] | undefined;
  _categoriaN_name: string = '';



  constructor(

    public repository: KatalogNService,
    public route: ActivatedRoute,
    public router: Router,

    public sharedVar: NomenclatrueVarService

  ) { }

  ngOnInit(): void {

    const categoriaId: string | null = this.route.snapshot.paramMap.get('id');
    const id: number = Number(categoriaId) || 0;
    this.route.queryParams.subscribe((queryParam: any) => {
      this._categoriaN_name = queryParam['categoria'];
    });
    this.sharedVar.IdCategoria=id;
    this.Load(id);

    // if (this.sharedVar.SEO_let) this.LoadSEO(this.sharedVar.SEO_let, id);

    // this.titleMeta.setTitle(this._categoriaN_name);
  }

  public onBackInNavBar() {
   // console.log(" onBackInNavBar")
    this.router.navigateByUrl('/content-n');

  }


  private Load(idCategoria: number): void {
    this.repository.KatalogNs(idCategoria).subscribe(
      (d) => {
        this._katalogNs = d;
      },
      (err) => {
        console.log(err);
      }
    ); //13.03.21
  }

 /*  private LoadSEO(item: SEO_var, idCategoria: number) {
    if (item.id || item.id == idCategoria)
      if (item.decriptSEO) {
        this.meta.updateTag({ name: 'description', content: item.decriptSEO });
      }

  } */

}
