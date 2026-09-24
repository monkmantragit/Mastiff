import 'server-only';
import { directusItems } from './directus-server';
import type { ClientLogo } from './client-logos-utils';

export type { ClientLogo } from './client-logos-utils';

export class ClientLogosService {
  /** All client logos, in CMS sort order. */
  static async getAllClientLogos(): Promise<ClientLogo[]> {
    return directusItems<ClientLogo>('client_logos', {
      fields: 'id,client_name,Category,client_logo,status,sort',
      sort: 'sort',
      limit: -1,
    });
  }
}
