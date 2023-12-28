import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private api: string = environment.api;
  constructor() { }

  protected createUrl(paths: string[]) {
    return this.api + '/' + paths.join('/');
  }

  protected createParams(params: any) {
    console.log("🚀 ~ params:", params)
    return Object.keys(params).reduce((m, k) => {
      if (params[k] != null) {
        if (Array.isArray(params[k])) {
          for (const value of params[k]) {
            m = m.append(k, value.toString());
          }
          return m;
        } else {
          return m.set(k, params[k].toString());
        }
      }
      return m;
    }, new HttpParams());
  }
}
