export type tTeamDetailInfo = {
  id: number;
  name: string;
  image: string;
  dateAndTime: string;
  roadNameAddress: string;
  maxMember: number;
  latitude: number;
  longitude: number;
  makers: tMakers;
  members: Array<{
    id: number;
    name: string;
  }>;
  isLeader: boolean;
};
export type tMakers = {
  id: number;
  name: string | null;
  image: string | null;
};
export type tTeamMapList = {
  id: number;
  name: string;
  image: string;
  leaderName: string;
  dateAndTime: string;
  roadNameAddress: string;
  userCount: number;
  maxMember: number;
  latitude: number;
  longitude: number;
};

export type tTeamJoin = {
  teamId: number;
  userId: number;
};

export type tCreateTeam = {
  userId: number;
  name: string;
  address: {
    zipCode: string;
    address1: string;
    address2?: string | null;
    address3: string;
    latitude: string;
    longitude: string;
  };
  deliveryDate: string | undefined;
  deliveryTime: string | undefined;
  isPublic: boolean;
  deliveryType: number;
};

export type tMyTeamList = {
  teamId: number;
  name: string;
};

export type tTeamMakers = {
  id: number;
  storeName: string;
  image: string | null;
};
export type tTeamMakersList = Array<tTeamMakers>;
