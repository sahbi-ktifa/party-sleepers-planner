import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISleeper } from 'app/shared/model/sleeper.model';

type EntityResponseType = HttpResponse<ISleeper>;
type EntityArrayResponseType = HttpResponse<ISleeper[]>;

@Injectable({ providedIn: 'root' })
export class SleeperService {
    private resourceUrl = SERVER_API_URL + 'api/sleepers';

    constructor(private http: HttpClient) {}

    create(sleeper: ISleeper): Observable<EntityResponseType> {
        return this.http.post<ISleeper>(this.resourceUrl, sleeper, { observe: 'response' });
    }

    update(sleeper: ISleeper): Observable<EntityResponseType> {
        return this.http.put<ISleeper>(this.resourceUrl, sleeper, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISleeper>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISleeper[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
