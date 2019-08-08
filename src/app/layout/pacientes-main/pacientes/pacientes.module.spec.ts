import { PacientesModule } from './pacientes.module';

describe('PacientesModule', () => {
  let pacientesModule: PacientesModule;

  beforeEach(() => {
    pacientesModule = new PacientesModule();
  });

  it('should create an instance', () => {
    expect(pacientesModule).toBeTruthy();
  });
});
