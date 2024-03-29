import { Component, OnInit , SimpleChanges  } from '@angular/core';
import { Color } from 'src/app/core-nomenclature/_interfaces/color.model';
import { Brand } from 'src/app/core-nomenclature/_interfaces/brand.model';
import { Article } from '../../../core-nomenclature/_interfaces/article.model';
import { Nomenclature } from 'src/app/core-nomenclature/_interfaces/nomenclature.model';
import { EventEmitter, Input, Output } from '@angular/core';
import { DtoFilterN } from 'src/app/ui-front/filter-n/filter-n.component';
import { StateView } from 'src/app/shared/_interfaces/state-view';
import { NomenclatrueVarService } from '../../shared/services/nomenclature-var.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { SEO_var } from 'src/app/shared/_interfaces/SEO-var.models';
import {NomenclatureService} from '../../shared/services/nomenclature.servise'

interface NomenclatureP extends Nomenclature {
  check?: boolean;
}

@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.scss']
})
export class NomenclatureComponent implements OnInit {

  public _katalogN_name:string|undefined;


  public _nomenclatures: Nomenclature[] = [];
  public _viewNomenclatrues: NomenclatureP[] = [];
  public _select_nomenclature:Nomenclature|undefined;

  public _articles: Article[] = [];
  public _brands: Brand[] = [];
  public _colors: Color[] = [];

  public _error: string | undefined;

  public _flagViewState: StateView = StateView.default;

  @Output() public _onChangeRow = new EventEmitter<Nomenclature>()


  constructor(
    private sharedVar: NomenclatrueVarService,
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private titleMeta: Title,
    private repository:  NomenclatureService,
  ) { }

  ngOnInit(): void {
    const katalogId: string | null = this.route.snapshot.paramMap.get('id');
    const id: number = Number(katalogId) || 0;

    this.route.queryParams.subscribe((queryParam: any) => {
      this._katalogN_name = queryParam['katalog'];
    });

    if (this.sharedVar.SEO_let) this.LoadSEO(this.sharedVar.SEO_let, id);
    if(this._katalogN_name)  this.titleMeta.setTitle(this._katalogN_name);


   
    this.Load(id);





  }

  ngOnChanges(changes: SimpleChanges) {

    this._nomenclatures.forEach(i => {
      i.articleName = this._articles.find(d => d.id === i.articleId)?.name;
      i.brandName = this._brands.find(d => d.id === i.brandId)?.name;
      i.colorName = this._colors.find(d => d.id === i.colorId)?.name;
    })




    // console.log(changes)
  }

  public ImgObj(nomenclature: Nomenclature): string {
            // copy paste  from manager module
    let root = nomenclature.wwwroot ? nomenclature.wwwroot : '';
    root = root + 'S' + nomenclature.guid + '.webp';
   /*  if (!nomenclature.wwwrootOK) {
      return root;
    }

    else {
      let timestamp = new Date().getTime();
      let queryString = "?t=" + timestamp;
      return root + queryString;
    } */
    return root;
  }

  public changeNomenclature(nomenclature: Nomenclature) {

    //  debugger
    /* console.log(" changeNomenclature");
    console.log(JSON.stringify(nomenclature)); */
   this._select_nomenclature=nomenclature;
   this._flagViewState=StateView.itemData;

  }

  public onChangeDefaultView(){
   // debugger
    this._flagViewState=StateView.default;
  }

  public onFilterNomenclatureChange(event: DtoFilterN) {
    // console.log(JSON.stringify(event.nomenclatures))
    console.log(event.nomenclatures.length);
    if (event.flag === true) {
      this._viewNomenclatrues = event.nomenclatures;
    }


  }

  public onChangeViewRender() {
    if (this._flagViewState===StateView.default)
      this._flagViewState = StateView.dataTable
    else this._flagViewState = StateView.default
  }

  public onBackInNavBar() {
   // debugger
    //console.log(" onBackInNavBar")
     if(this.sharedVar.IdCategoria!==-1)
    this.router.navigateByUrl('/content-n/categoria/'+this.sharedVar.IdCategoria);
    else{
      if(this._nomenclatures.length>0)
      this.repository.KatalogN(this._nomenclatures[0].katalogId).subscribe(
        d=>{
          console.log('onBackInNavBar ----- nomenclature')
          console.log(JSON.stringify(d))
          this.router.navigateByUrl('/content-n/categoria/'+d.categoriaId);

        }
      )



    }


  }

  private LoadSEO(item: SEO_var, idKatalog: number) {
    if (item.id || item.id == idKatalog)
      if (item.decriptSEO) {
        this.meta.updateTag({ name: 'description', content: item.decriptSEO });
      }

  }

  private Load(idKatlog: number): void {
    this.repository.NomenclaturePKs(idKatlog).subscribe(
      (d) => {
        this._error=undefined;
        this._nomenclatures = d;
      },
      (err) => {
        this._error='Ошибка загрузки данных';
        console.log(err);
      },
      ()=>{
        this._viewNomenclatrues = [...this._nomenclatures];
      }
    ); //13.03.21
  }

}
