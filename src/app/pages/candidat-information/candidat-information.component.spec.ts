import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatInformationComponent } from './candidat-information.component';

describe('CandidatInformationComponent', () => {
  let component: CandidatInformationComponent;
  let fixture: ComponentFixture<CandidatInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
