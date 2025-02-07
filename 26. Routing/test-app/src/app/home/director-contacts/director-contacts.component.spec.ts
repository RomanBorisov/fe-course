import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorContactsComponent } from './director-contacts.component';

describe('DirectorContactsComponent', () => {
  let component: DirectorContactsComponent;
  let fixture: ComponentFixture<DirectorContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectorContactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
