import { Component, OnInit } from '@angular/core';
//import {  SimpleChanges } from '@angular/core';
import { Nomenclature } from 'src/app/core-nomenclature/_interfaces/nomenclature.model';
import { EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NomenclatureService } from '../services/nomenclature.servise';
import { NomenclatrueVarService } from '../services/nomenclature-var.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-base-nomenclature-item',
  template: ``,
  styleUrls: [],
})
export class BaseNomenclatureItemComponent implements OnInit {
  @Output() public _onChangeBack = new EventEmitter();
  @Input() public _nomenclature: Nomenclature | undefined;
  @Input() public _isChildComponent: boolean = false;
  @Input() public _katalog_name: string | undefined;
  public _flagShowQRcode: boolean = false;
  private _clientHostURL: string;

  public get NomenclatureURL(): string | undefined {
    if (this._nomenclature)
      return (
        'content-n/opt/optkatalog/optnomenclature/' + this._nomenclature.id
      );
    else return undefined;
  }

  public get KatalogURL(): string | undefined {
    if (this._nomenclature)
      return 'content-n/opt/optkatalog/' + this._nomenclature.katalogId;
    else return undefined;
  }

  public get FullName(): string {
    let name = '';
    let article = '';
    let color = '';
    let brand = '';
    name = this._nomenclature?.name ? this._nomenclature.name : '';
    if (this._nomenclature?.articleName)
      article =
        this._nomenclature?.articleName === 'none'
          ? ''
          : this._nomenclature.articleName;
    if (this._nomenclature?.colorName)
      color =
        this._nomenclature?.colorName === 'none'
          ? ''
          : this._nomenclature.colorName;
    if (this._nomenclature?.brandName)
      brand =
        this._nomenclature?.brandName === 'none'
          ? ''
          : this._nomenclature.brandName;

    //  console.log( )
    return name + ' ' + brand + ' ' + color + ' ' + article;
  }

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public repository: NomenclatureService,
    public sharedVar: NomenclatrueVarService,
    public clipboard: Clipboard
  ) {
    this._clientHostURL = environment.clientRoot;
  }

  ngOnInit(): void {
    //console.log("----- ngOnInit base-nomenclatureItem --------");
    if (!this._isChildComponent) {
      const nomenclatureId: string | null =
        this.route.snapshot.paramMap.get('id');

      if (nomenclatureId) {
        const id: number = Number(nomenclatureId) || 0;
        this.load(id);
        //  console.log("ngOnInit nomenclatureItem _isChildComponent --false");
      }
      //  console.log("ngOnInit nomenclatureItem _isChildComponent --false");
    } else {
      if (this._nomenclature) {
        this.load(this._nomenclature.id);
      }
    }
  }

  /*  ngOnChanges(changes: SimpleChanges) {

    console.log("----- ngOnChanges base-nomenclatureItem --------");
  }
 */

  public copyLinkN() {
    if (this.NomenclatureURL)
      this.clipboard.copy(this._clientHostURL + this.NomenclatureURL);
  }

  public copyLinkK() {
    if (this.KatalogURL)
      this.clipboard.copy(this._clientHostURL + this.KatalogURL);
  }

  public ImgObj(): string {
    // copy paste  from manager module
    if (this._nomenclature) {
      let root = this._nomenclature.wwwroot ? this._nomenclature.wwwroot : '';
      root = root + 'L' + this._nomenclature.guid + '.webp';

      return root;
    } else return '';
  }

 /*  public onBack() {
    if (this._isChildComponent) {
      this._onChangeBack.next();
      return;
    }
    if (this._nomenclature) {
      this.router.navigateByUrl(
        '/content-n/categoria/katalog/' + this._nomenclature.katalogId
      );
    }
  } */

  public onToggle() {
    this._flagShowQRcode = !this._flagShowQRcode;
  }

  private load(id: number) {
    this.repository.Nomenclature(id).subscribe((d) => {
      this._nomenclature = d;
    });
  }

  /*  private LoadSEO(item: SEO_var, idKatalog: number) {
    if (item.id || item.id == idKatalog)
      if (item.decriptSEO) {
        this.meta.updateTag({ name: 'description', content: item.decriptSEO });
      }

  } */
}
