import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse,HttpErrorResponse,HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private as:AuthService){

    }

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

                let newReq;
        // const idToken = sessionStorage.getItem("id_token");
        const idToken=this.as.getAccessToken();
        // const idToken='poobah'

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });

            newReq=cloned;
        }
        else {
            newReq=req;
        }

        return next.handle(newReq).pipe(catchError((err,caught) => {
            if(err instanceof HttpErrorResponse){
              if(err.status==403){
                    this.as.reactivateTokens();
                    
                    console.log('interceptor works')
                    let newReq;
                    let idToken=''
                    setTimeout(()=>{
                        idToken=this.as.getAccessToken();
                        if (idToken) {
                            const cloned = req.clone({
                                headers: req.headers.set("Authorization",
                                    "Bearer " + idToken)
                            });
                
                            newReq=cloned;
                        }
                        
    

                    },500);

                    if(!newReq)newReq=req;
                    
                   
                    

                    return next.handle(newReq);
                    
                }
                else{
                    return throwError(err);
                }

            }

            return caught;
        }));
    }
}