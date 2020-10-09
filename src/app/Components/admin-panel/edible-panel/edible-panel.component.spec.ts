import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiblePanelComponent } from './edible-panel.component';

describe('EdiblePanelComponent', () => {
  let component: EdiblePanelComponent;
  let fixture: ComponentFixture<EdiblePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdiblePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdiblePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
