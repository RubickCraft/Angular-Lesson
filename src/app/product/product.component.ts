import {Component, OnInit} from '@angular/core';

import {ProductModel} from './product.model';
import {ProductService} from '../shared/product.service';
import {FormControl} from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import {HttpErrorResponse} from '@angular/common/http';
import {HttpServiceService} from "../http-service.service";
import {CommunicationServiceService} from "../shared/communication-service.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Array<ProductModel>;

  imgSrc: string = 'http://placehold.it/320x150';

  keyWord: string;

  titleFilter: FormControl = new FormControl();

  constructor(
    public productService: ProductService,
    public mHttp: HttpServiceService,
    public cs: CommunicationServiceService
  ) {}

  ngOnInit() {
    this._initData();
    this.getProducts();

    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(value => this.keyWord = value);
  }


  private getProducts(data?) {
    this.productService.getProducts(data).subscribe(
      data => {
        this.products = data;
      },
      (error2: HttpErrorResponse) => {
      });
  }

  private _initData() {
    this.productService.searchEvent.subscribe(
      data=> {
        this.getProducts(data);
      }
    );

    this.cs.search$.subscribe(
      data=> {
        this.getProducts(data);
      }
    )

    /*this.http.get<Array<ProductModel>>('product/getProductsss').subscribe(
      data => {
        this.products = data;
      },
      (error2: HttpErrorResponse) => {
        debugger;
      }
    )*/

    /*this.http.get<Array<ProductModel>>('product/getProducts').debounceTime(2000).toPromise().then(data => {
      this.products = data;
    })*/
    /*let _self = this;

    this.mHttp.get<Array<ProductModel>>({
      url: 'product/getProducts',
      params: {
        'a': '1',
      },
      onSuccess(data) {
        debugger;
        _self.products = data;
      }
    })
*/
  }

}
