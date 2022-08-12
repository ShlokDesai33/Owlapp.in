interface AlgoliaHit {
  objectID: string
  path: string
  lastModified: number
}

interface UserHit extends AlgoliaHit  {
  fullname: string
  image: string
  id: string
  followers: number
  rank: number
}

interface ForumHit extends AlgoliaHit {
  topic: string
  id: string
  minRank: number
  creator: {
    fullname: string
    image: string
    id: string
  }
}

interface ResourceHit extends AlgoliaHit {
  name: string
  id: string
  status: string
  // price per sample
  pps: number
  // organization / owner
  org: {
    name: string
    image: string
    id: string
  }
}

export type { UserHit, ForumHit, ResourceHit }