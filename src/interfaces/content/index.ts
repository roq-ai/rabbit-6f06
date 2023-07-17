import { AdvertisementInterface } from 'interfaces/advertisement';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ContentInterface {
  id?: string;
  video?: string;
  picture?: string;
  user_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  advertisement?: AdvertisementInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    advertisement?: number;
  };
}

export interface ContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  video?: string;
  picture?: string;
  user_id?: string;
  organization_id?: string;
}
