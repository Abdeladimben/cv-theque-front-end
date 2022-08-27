import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurOffresComponent } from './utilisateur-offres.component';

describe('UtilisateurOffresComponent', () => {
  let component: UtilisateurOffresComponent;
  let fixture: ComponentFixture<UtilisateurOffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateurOffresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateurOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
