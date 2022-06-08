import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KatalogN } from 'src/app/_shared/_interfaces/katalog-n.model';
import { KatalogNService } from '../../shared/services/katalog-n.service';
import { SharedVarService } from 'src/app/_shared/services/shared-var.service';

@Component({
  selector: 'app-opt-katalog-n',
  templateUrl: './opt-katalog-n.component.html',
  styleUrls: ['./opt-katalog-n.component.scss'],
})
export class OptKatalogNComponent implements OnInit {
  _katalogNs: KatalogN[] | undefined;
  _categoriaN_name: string = '';

  constructor(
    private repository: KatalogNService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedVar: SharedVarService
  ) {}

  ngOnInit(): void {
    const categoriaId: string | null = this.route.snapshot.paramMap.get('id');
    const id: number = Number(categoriaId) || 0;
    this.route.queryParams.subscribe((queryParam: any) => {
      this._categoriaN_name = queryParam['categoria'];
    });
    this.sharedVar.IdCategoria=id;
    this.Load(id);
  }

  public onBackInNavBar() {
    console.log(" onBackInNavBar")
    this.router.navigateByUrl('/content/opt');

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
}
