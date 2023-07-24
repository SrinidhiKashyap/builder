import { Component, Input ,Output,EventEmitter, ElementRef, HostListener} from '@angular/core';

@Component({
  selector: 'app-label-module',
  templateUrl: './label-module.component.html',
  styleUrls: ['./label-module.component.scss']
})
export class LabelModuleComponent {
  @Input() label!: string;
  @Output() labelChange: EventEmitter<string> = new EventEmitter<string>();
  isEditable: boolean = false;

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
    if (!this.label) {
      this.label = 'Sample Label';
    }
  }

  toggleEdit() {
    if(!this.isEditable){
    this.isEditable = !this.isEditable;
    }
  }

  onLabelChange() {
    this.labelChange.emit(this.label);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    // Check if the click is outside the component element
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isEditable = false; // Turn off editing mode
    }
  }

}
