// types/matchTypes.ts
export interface League {
  active: boolean; // Indicates if the match is active
  category: number; // Category ID
  country_id: number; // Country ID
  has_jerseys: boolean; // Indicates if jerseys are available
  id: number; // Match ID
  image_path: string; // URL to the league image
  last_played_at: string; // Last played date and time (YYYY-MM-DD HH:mm:ss)
  name: string; // Match or league name
  short_code: string; // Short code for the league
  sport_id: number; // Sport ID
  sub_type: string; // Subtype of the match (e.g., domestic)
  today: Match[]; // Array of matches for today
  length: number; // Length of the match or array
  type: string; // Type of the match (e.g., league)
}

export interface Match {
  id: number; // Match ID
  sport_id: number; // Sport ID
  league_id: number; // League ID
  season_id: number; // Season ID
  stage_id: number; // Stage ID
  group_id: number | null; // Group ID (nullable)
  aggregate_id: number | null; // Aggregate ID (nullable)
  round_id: number; // Round ID
  state_id: number; // State ID
  venue_id: number; // Venue ID
  starting_at: string; // Match start time (YYYY-MM-DD HH:mm:ss)
  starting_at_timestamp: number; // Match start time as a Unix timestamp
  name: string; // Match name (e.g., "Leicester City vs Newcastle United")
  length: number; // Match length in minutes
  leg: string; // Match leg (e.g., "1/1")
  has_odds: boolean; // Indicates if odds are available
  has_premium_odds: boolean; // Indicates if premium odds are available
  placeholder: boolean; // Indicates if this is a placeholder match
  result_info: string | null; // Additional result information (nullable)
  details: string | null; // Additional match details (nullable)
  participants: Participant[]; // Array of participants (teams)
  scores: Score[]; // Array of scores (if available)
  round: Round; // Round information
  stage: Stage; // Stage information
}

// Define the structure for participants (teams)
export interface Participant {
  id: number; // Team ID
  sport_id: number; // Sport ID
  country_id: number; // Country ID
  venue_id: number; // Venue ID
  gender: string; // Gender (e.g., "male")
  name: string; // Team name
  short_code: string; // Short code for the team
  image_path: string; // URL to the team image
  founded: number; // Year the team was founded
  type: string; // Type of the team (e.g., "domestic")
}

// Define the structure for scores
export interface Score {
  home: number | null; // Home team score
  away: number | null; // Away team score
}

// Define the structure for round information
export interface Round {
  id: number; // Round ID
  name: string; // Round name (e.g., "31")
  league_id: number; // League ID
  season_id: number; // Season ID
  sport_id: number; // Sport ID
  stage_id: number; // Stage ID
  starting_at: string; // Round start date
  ending_at: string; // Round end date
  finished: boolean; // Indicates if the round is finished
  games_in_current_week: boolean; // Indicates if games are in the current week
  is_current: boolean; // Indicates if this is the current round
}

// Define the structure for stage information
export interface Stage {
  id: number; // Stage ID
  sport_id: number; // Sport ID
  league_id: number; // League ID
  season_id: number; // Season ID
  type_id: number; // Type ID
  name: string; // Stage name (e.g., "Regular Season")
  sort_order: number; // Sort order for the stage
  finished: boolean; // Indicates if the stage is finished
  is_current: boolean; // Indicates if this is the current stage
  starting_at: string; // Stage start date
  ending_at: string; // Stage end date
}

export interface Transfer {
  amount: number; // Transfer amount
  career_ended: boolean; // Indicates if the player's career ended
  completed: boolean; // Indicates if the transfer is completed
  date: string; // Date of the transfer in string format (YYYY-MM-DD)
  detailed_position_id: number; // ID for the detailed position
  from_team_id: number; // ID of the team the player is transferring from
  id: number; // Unique ID of the transfer
  player_id: number; // ID of the player involved in the transfer
  position_id: number; // ID of the player's position
  sport_id: number; // ID of the sport
  to_team_id: number; // ID of the team the player is transferring to
  type_id: number; // ID of the transfer type
}

export interface SelectedDate {
  dateString: string; // Selected date in string format (YYYY-MM-DD)
  day: number; // Day of the month
  month: number; // Month (1-12)
  timestamp: number; // Timestamp in milliseconds since epoch
  year: number; // Year (e.g., 2025)

}