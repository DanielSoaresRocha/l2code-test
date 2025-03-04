import { HttpParams } from '@angular/common/http';

// Interface para gerar HttpParams dinâmicamente
export class HttpParamsBuilder implements IHttpParamsBuilder {
  private params: HttpParams;

  constructor(obj: any) {
    this.params = new HttpParams();
    this.append(obj);
  }

  private append(obj: any) {
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        this.params = this.params.append(key, value as any);
      }
    });
  }

  build(): HttpParams {
    return this.params;
  }
}

interface IHttpParamsBuilder {
  build(): HttpParams;
}
