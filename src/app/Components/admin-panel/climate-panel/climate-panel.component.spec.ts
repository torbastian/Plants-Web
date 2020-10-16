import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimatePanelComponent } from './climate-panel.component';

describe('ClimatePanelComponent', () => {
  let component: ClimatePanelComponent;
  let fixture: ComponentFixture<ClimatePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimatePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimatePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
