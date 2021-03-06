import { relationalDb } from '../config/pouchdb'
import Incident from '../model/Incident'
import Repository from './Repository'
interface SearchOptions {
  status: IncidentFilter
}
enum IncidentFilter {
  reported = 'reported',
  resolved = 'resolved',
  all = 'all',
}
class IncidentRepository extends Repository<Incident> {
  constructor() {
    super('incident', relationalDb)
  }

  async search(options: SearchOptions): Promise<Incident[]> {
    return super.search(IncidentRepository.getSearchCriteria(options))
  }

  private static getSearchCriteria(options: SearchOptions): any {
    const statusFilter =
      options.status !== IncidentFilter.all ? [{ 'data.status': options.status }] : []
    const selector = {
      $and: statusFilter,
    }
    return {
      selector,
    }
  }
}

export default new IncidentRepository()
