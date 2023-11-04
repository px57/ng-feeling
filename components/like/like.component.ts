import { 
  Component, 
  Input, 
  Output, 
  EventEmitter,
} from '@angular/core';

import { 
  FeelingService, 
  StreamFeelingTP 
} from '../../services/feeling.service';

@Component({
  selector: 'feeling-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent {
  @Input() 
  public relatedModel: string = '';

  @Input()
  public relatedModelId: number = -1;

  /**
   * @description:
   */
  public feeling: any = {};

  constructor(
    private feelingService: FeelingService,
  ) {
    this.bindFeelingStream();
  }

  /**
   * @description:
   */
  public click_like($event: any): void {
    const params = {
      relatedModel: this.relatedModel,
      relatedModelId: this.relatedModelId,
    };
    this.feelingService.post('like', params).subscribe((response: any) => {
      console.log(response);
      this.feeling = response.feeling;
    });
  }

  /**
   * @description:
   */
  public click_dislike($event: any): void {
    const params = {
      relatedModel: this.relatedModel,
      relatedModelId: this.relatedModelId,
    };
    this.feelingService.post('dislike', params).subscribe((response: any) => {
      console.log(response);
      this.feeling = response.feeling;
    });
  }

  /**
   * @description: 
   */
  private bindFeelingStream(): void {
    this.feelingService.stream.subscribe((feeling: StreamFeelingTP) => { 
      switch (feeling.event) {
        case 'loaded':
          const feeling = this.feelingService.getFeeling(this.relatedModel, this.relatedModelId);
          this.feeling = feeling;
          break;
      }
    });
  }
  
  /**
   * @description:
   */
  public get_like_or_dislike(): -1 | 0 | 1 {
    if (this.feeling === null || this.feeling === undefined) {
      return -1;
    }
    return this.feeling.like_or_dislike;
  }

  /**
   * @description:
   */
  public has_liked(): boolean {
    return this.get_like_or_dislike() === 1;
  }

  /**
   * @description:
   */
  public has_disliked(): boolean {
    return this.get_like_or_dislike() === 0;
  }
}