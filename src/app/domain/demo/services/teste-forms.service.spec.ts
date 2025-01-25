import { TestBed } from '@angular/core/testing';

import { TesteFormsService } from './teste-forms.service';

describe('TesteFormsService', () => {
  let service: TesteFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesteFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
