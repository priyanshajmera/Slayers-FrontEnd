import { Injectable } from "@angular/core";
import { LoaderService } from "../Services/loader.service";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { finalize } from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class HttpLoader implements HttpInterceptor {
    constructor(private loaderService: LoaderService) { }

    intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      this.loaderService.show();
  
      return next.handle(request).pipe(
        finalize(() => {
          this.loaderService.hide();
        })
      );
    }
}
