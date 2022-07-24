import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { AlgorithmSearchParamModel } from "../model/algorithm-search-param.model";
import { FeatureSetParamSearchParamModel } from "../model/feature-set-param-search-param.model";
import { MethodSearchParamModel } from "../model/method-search-param.model";
import { ModelParamSearchParamModel } from "../model/model-param-search-param.model";
import { PaggingModel } from "../model/pagging.model";
import { ResultPagging } from "../model/result-pagging.model";

@Injectable({ providedIn: 'root' })
export class MetaService {

    baseURL: string;

    constructor(
        private http: HttpClient
    ) {
        this.baseURL = environment.baseURL + environment.api;
    }

    requestSearchFeatureSetParams(pagging: PaggingModel, searchParam: FeatureSetParamSearchParamModel): Observable<ResultPagging> {
        const url = new URL(this.baseURL + '/feature-params');

        for (const [key, value] of Object.entries(searchParam)) {
            if (value
                && value.length > 0
            ) {
                url.searchParams.set(key, value);
            }
        }

        return this.http.get<ResultPagging>(url.href);
    }

    requestSearchModelParams(pagging: PaggingModel, searchParam: ModelParamSearchParamModel): Observable<ResultPagging> {
        const url = new URL(this.baseURL + '/model-parameters');

        for (const [key, value] of Object.entries(searchParam)) {
            if (value
                && value.length > 0
            ) {
                url.searchParams.set(key, value);
            }
        }

        return this.http.get<ResultPagging>(url.href);
    }

    requestSearchMethods(pagging: PaggingModel, searchParam: MethodSearchParamModel): Observable<ResultPagging> {
        const url = new URL(this.baseURL + '/methods');

        for (const [key, value] of Object.entries(searchParam)) {
            if (value
                && ((typeof (value) === 'string' && value.length > 0) || (typeof (value) !== 'string'))
            ) {
                url.searchParams.set(key, value);
            }
        }

        return this.http.get<ResultPagging>(url.href);
    }

    requestSearchAlgorithms(pagging: PaggingModel, searchParam: AlgorithmSearchParamModel): Observable<ResultPagging> {
        const url = new URL(this.baseURL + '/algorithms');

        for (const [key, value] of Object.entries(searchParam)) {
            if (value
                && ((typeof (value) === 'string' && value.length > 0) || (typeof (value) !== 'string'))
            ) {
                url.searchParams.set(key, value);
            }
        }

        return this.http.get<ResultPagging>(url.href);
    }
}