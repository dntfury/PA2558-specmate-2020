import { Directive, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { IContainer } from '../../../../../model/IContainer';
import { NavigatorService } from '../services/navigator.service';

@Directive({ selector: '[navigationTarget]' })
export class NavigationTargetDirective implements OnInit {

    @Input('navigationTarget') target: IContainer;

    @HostListener('click', ['$event'])
    onClick(e: Event) {
        e.preventDefault();
        this.navigatorService.navigate(this.target);
    }

    constructor(private elementRef: ElementRef, private navigatorService: NavigatorService) {
        elementRef.nativeElement.href = '';
    }

    ngOnInit() {
        if (this.target) {
            this.elementRef.nativeElement.title = 'Navigate to ' + this.target.name;
        }
    }
}