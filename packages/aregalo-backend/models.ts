export class User {
  constructor(
    public name: string,
    public alias: string,
    public image: string
  ) {}
}

export class WishCreatePresent {
  constructor(
    public title: string,
    public description: string,
    public favourite: boolean,
    public link?: string,
    public price?: number
  ) {}
}

export class WishPresent {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public favourite: boolean,
    public link?: string,
    public price?: number
  ) {}
}

export class GiftPresent {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public favourite: boolean,
    public assignedTo: string[],
    public link?: string,
    public price?: number
  ) {}
}
