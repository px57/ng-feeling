import { Injectable } from '@angular/core';
import { HttpService } from 'src/modules/tools/services/http.service';
import { Subject } from 'rxjs';
import { UntypedFormBuilder } from '@angular/forms';

/**
 * @description: Il s'agit ici du processus pour charger la liste de l'ensemble des feeling d'un coup net. 
 */
export interface FeelingLoadListTP {
  relatedModel: string,
  relatedModelListId: Array<number>,
};

/**
 * @description: 
   * @example: 
    {
      'relatedModel': {
        relatedModel: 'relatedModel',
        relatedModelListId: [1, 2, 3, 4, 5],
      },
      'relatedModel': {
        relatedModel: 'relatedModel',
        relatedModelListId: [1, 2, 3, 4, 5],
      },
      'relatedModel': {
        relatedModel: 'relatedModel',
        relatedModelListId: [1, 2, 3, 4, 5],
      },
    }
 */
export interface FeelingLoadList {
  [key: string]: FeelingLoadListTP,
}

/**
 * @description: 
 */
export interface FeelingListTP {
  [key: string]: Array<any>,
}

/**
 * @description: 
 */
export interface StreamFeelingTP {
  event: 'loaded',
};

@Injectable({
  providedIn: 'root'
})
export class FeelingService {
  /**
   * @description: 
   */
  public stream: Subject<StreamFeelingTP> = new Subject<StreamFeelingTP>();

  /**
   * @description: 
   */
  public feelingsLoadList: FeelingLoadList = {};

  /**
   * @description: 
   */
  public feelingsList: FeelingListTP = {};


  /**
   * @description: 
   */
  public constructor(
    private httpService: HttpService,
  ) {

  }

  /**
   * @description:
   */
  public setFeelingLoadList(relatedModel: string, id: number): void {
    if (this.feelingsLoadList[relatedModel]) {
      this.feelingsLoadList[relatedModel].relatedModelListId.push(id);
    } else {
      this.feelingsLoadList[relatedModel] = {
        relatedModel: relatedModel,
        relatedModelListId: [id],
      };
    }
  }

  /**
   * @description:
   */
  public loadFeelingList(callback: Function | undefined): void {
    const feelingsLoadList = this.feelingsLoadList;
    this.reset_feelingsLoadList();
    console.log('feelingsLoadList', feelingsLoadList)
    this.httpService.post('feeling/load', {jsonQuery: JSON.stringify(feelingsLoadList)}).subscribe((response: any) => {
      if (!response.success) {
        return; 
      }
      this.feelingsList = response.feeling;
      callback && callback(response.data);
      this.stream.next({event: 'loaded'});
    });
  }

  /**
   * @description: 
   */
  private reset_feelingsLoadList(): void {
    this.feelingsLoadList = {};
  }

  /**
   * @description: 
   */
  public getFeeling(relatedModel: string, relatedModelId: number): any {
    console.log('getFeeling', relatedModel, relatedModelId)
    console.log(this.feelingsList)
    if (this.feelingsList[relatedModel] === undefined) {
      return null;
    }

    const feelingRelatedModelList = this.feelingsList[relatedModel];
    for (let i = 0; i < feelingRelatedModelList.length; i++) {
      const feeling = feelingRelatedModelList[i];
      if (feeling.relatedModelId === relatedModelId) {
        return feeling;
      }
    }
    return null;
  }

  /**
   * @description: 
   * 
   */
  public post(event: string, params: any): any {
    return this.httpService.post(`feeling/${event}`, params);
  }
}
