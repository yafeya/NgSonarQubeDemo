import { Injectable, InjectionToken, EventEmitter } from '@angular/core';

declare var EnjoyHint: any;
declare var $: any;


export const TourServiceToken = new InjectionToken('./ITourService');

export interface ITourStep {
    Event: string;
    Selector: string;
    Description: string;
    Timeout?: number;
    Shape?: 'circle' | 'rect';
    Margin?: number;
    Top?: number;
    Right?: number;
    Bottom?: number;
    Left?: number;
    NextButton?: { className: string, text: string },
    SkipButton?: { className: string, text: string },
    ShowSkip?: boolean,
    ShowNext?: boolean,
    BeforeStart?: EventEmitter<any>
}

export interface ITourService {
    /**
     * triggered when start tour
     */
    OnStart: EventEmitter<any>;
    /**
     * triggered when tour end
     */
    OnEnd: EventEmitter<any>;
    /**
     * triggered when tour skipped
     */
    OnSkip: EventEmitter<any>;

    /**
     * Run the steps
     */
    Run(steps: ITourStep[]): void;

}

@Injectable()
export class TourService implements ITourService {
    OnStart = new EventEmitter();
    OnEnd = new EventEmitter();
    OnSkip = new EventEmitter();

    Run(steps: ITourStep[]): void {
        try {
            let finishAction = () => {
                // avoid vertical scroll bar added by EnjoyHint
                setTimeout(function () {
                    document.body.setAttribute('style', '');
                }, 50);
            };
            let self = this;

            let instance = new EnjoyHint({
                onEnd: function () {
                    finishAction();
                    self.OnEnd.emit();
                },
                onSkip: function () {
                    finishAction();
                    self.OnSkip.emit();
                },
                onStart: function () {
                    self.OnStart.emit();
                }
            });

            instance.set(self.ConvertSteps(steps));
            instance.run();
        } catch (error) {
            console.log(error);
        }
    }

    private ConvertSteps(steps: ITourStep[]): any[] {
        let values = [];
        if (steps) {
            steps.forEach(x => {
                let value = {
                    event: x.Event,
                    selector: x.Selector,
                    description: x.Description,
                    timeout: x.Timeout,
                    shape: x.Shape,
                    margin: x.Margin,
                    top: x.Top,
                    right: x.Right,
                    left: x.Left,
                    bottom: x.Bottom,
                    nextButton: x.NextButton,
                    skipButton: x.SkipButton,
                    showSkip: x.ShowSkip,
                    showNext: x.ShowNext,
                    onBeforeStart: x.BeforeStart
                };
                values.push(value);
            });
        }
        return values;
    }
}
