import { Component, OnInit } from '@angular/core';
import { Nomenclature } from 'src/app/_shared/_interfaces/nomenclature.model';
import { EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NomenclatureService } from './../../shared/services/nomenclature.servise'
import { SharedVarService } from 'src/app/_shared/services/shared-var.service';
import {Clipboard} from '@angular/cdk/clipboard';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-nomenclature-item',
  templateUrl: './nomenclature-item.component.html',
  styleUrls: ['./nomenclature-item.component.scss']
})
export class NomenclatureItemComponent implements OnInit {


  @Output() public _onChangeBack = new EventEmitter()
  @Input() public _nomenclature: Nomenclature | undefined;
  @Input() public _isChildComponent: boolean = false;
  @Input() public _katalog_name:string |undefined;
  public _flagShowQRcode: boolean = false;
  private _clientHostURL:string;



  public get NomenclatureURL(): string | undefined {
    if (this._nomenclature)
      return 'content/opt/optkatalog/optnomenclature/' + this._nomenclature.id;
    else return undefined;
  }

  public get KatalogURL(): string | undefined {
    if (this._nomenclature)
      return 'content/opt/optkatalog/' + this._nomenclature.katalogId;
    else return undefined;
  }

  public get FullName():string{

       let name='';
       let article=''
       let color=''
       let brand=''
       name=this._nomenclature?.name?this._nomenclature.name:'';
       if(this._nomenclature?.articleName)
       article=this._nomenclature?.articleName==='none'?'':this._nomenclature.articleName;
       if(this._nomenclature?.colorName)
       color=this._nomenclature?.colorName==='none'?'':this._nomenclature.colorName;
       if(this._nomenclature?.brandName)
       brand=this._nomenclature?.brandName==='none'?'':this._nomenclature.brandName;

     //  console.log( )
       return name+" "+brand+" "+color+" "+article;

  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repository: NomenclatureService,
    private sharedVar: SharedVarService,
    private clipboard: Clipboard
  ) {

    this._clientHostURL = environment.clientRoot;
   }

  ngOnInit(): void {

    // this is for http.get(http://localhost:4200/content/categoria/katalog/nomenclature/:id)
    if (!this._isChildComponent) {
      const nomenclatureId: string | null = this.route.snapshot.paramMap.get('id');
      // resolver run //(QR-code)
      this.route.data.subscribe();

      if (nomenclatureId) {
        const id: number = Number(nomenclatureId) || 0;
        this.load(id);
      }
      console.log("ngOnInit nomenclatureItem _isChildComponent --false");
    } else {
      if (this._nomenclature) {
        this._nomenclature.articleName = this.sharedVar.ArticleNs.length > 0 ? this.sharedVar.ArticleNs.find(d => d.id === this._nomenclature!.articleId)?.name : undefined;
        this._nomenclature.brandName = this.sharedVar.BrandNs.length > 0 ? this.sharedVar.BrandNs.find(d => d.id === this._nomenclature!.brandId)?.name : undefined;
        this._nomenclature.colorName = this.sharedVar.ColorNs.length > 0 ? this.sharedVar.ColorNs.find(d => d.id === this._nomenclature!.colorId)?.name : undefined;

      }

    }

    // console.log("NomemclatureItem -- clolrN.lenght"+this.sharedVar.ColorNs.length)

  }

 public copyLinkN(){
 if(this.NomenclatureURL)
 this.clipboard.copy(this._clientHostURL + this.NomenclatureURL)

 }

 public copyLinkK(){
  if(this.KatalogURL)
  this.clipboard.copy(this._clientHostURL + this.KatalogURL)
 }

  public ImgObj(): string {
    // copy paste  from manager module
    if (this._nomenclature) {
      let root = this._nomenclature.wwwroot ? this._nomenclature.wwwroot : '';
      root = root + 'L' + this._nomenclature.guid + '.webp';

      return root;
    }
    else return '';
  }

  public onBack() {
    if (this._isChildComponent) {
      this._onChangeBack.next();
      return;
    }
    if (this._nomenclature) {
      this.router.navigateByUrl('/content/categoria/katalog/' + this._nomenclature.katalogId);
    }
  }

  public onToggle() {
    this._flagShowQRcode = !this._flagShowQRcode;
  }


  private load(id: number) {
    this.repository.Nomenclature(id).subscribe(
      d => {
        this._nomenclature = d;


      },
      err => { },
      () => {

        if (this._nomenclature) {
          this._nomenclature.articleName = this.sharedVar.ArticleNs.length > 0 ? this.sharedVar.ArticleNs.find(d => d.id === this._nomenclature!.articleId)?.name : undefined;
          this._nomenclature.brandName = this.sharedVar.BrandNs.length > 0 ? this.sharedVar.BrandNs.find(d => d.id === this._nomenclature!.brandId)?.name : undefined;
          this._nomenclature.colorName = this.sharedVar.ColorNs.length > 0 ? this.sharedVar.ColorNs.find(d => d.id === this._nomenclature!.colorId)?.name : undefined;

        }

      }

    )

  }

}
