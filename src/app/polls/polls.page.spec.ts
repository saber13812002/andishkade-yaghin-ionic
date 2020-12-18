import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PollsPage } from './polls.page';

describe('PollsPage', () => {
  let component: PollsPage;
  let fixture: ComponentFixture<PollsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PollsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
