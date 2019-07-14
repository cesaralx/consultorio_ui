import { AgendaRoutingModule } from './agenda-routing.module';

describe('AgendaRoutingModule', () => {
    let agendaRoutingModule: AgendaRoutingModule;

    beforeEach(() => {
        agendaRoutingModule = new AgendaRoutingModule();
    });

    it('should create an instance', () => {
        expect(agendaRoutingModule).toBeTruthy();
    });
});
