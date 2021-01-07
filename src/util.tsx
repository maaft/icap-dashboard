import { SemanticCOLORS } from 'semantic-ui-react'

export function StakingPeriodToMultiplier(period: number) {
  switch(period) {
    case 2592000:
      return 1.0
    case 7776000:
      return 1.33
    case 15552000:
      return 1.66
    case 31536000:
      return 2.0
    default:
      console.log("FATAL!")
      return 1.0
  }
}

export const TokenColors: Map<string, SemanticCOLORS> = new Map([["IHF", "yellow"], ["C20", "olive"], ["C10", "green"], ["EMS", "teal"], ["IBA", "blue"], ["IGP", "violet"], ["IML", "purple"], ["ICAP", "pink"]])
