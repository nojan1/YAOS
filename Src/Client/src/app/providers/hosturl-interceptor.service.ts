import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerStateService } from './server-state.service';

@Injectable()
export class HosturlInterceptorService implements HttpInterceptor {

  constructor(private serverStateService: ServerStateService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (req.url.startsWith("/api")) {
      let newReq = req.clone({
        url: this.serverStateService.serverBaseUrl + req.url
      });

      return next.handle(newReq);
    } else {
      return next.handle(req);
    }
  }
}
