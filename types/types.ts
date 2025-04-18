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
  scores: Scores[]; // Array of scores (if available)
  round: Round; // Round information
  stage: Stage; // Stage information
  state: State; // State information
}

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
  last_played_at: string; // Last played date and time (YYYY-MM-DD HH:mm:ss)
}

export interface Scores {
  description: string; // Description of the score (e.g., "CURRENT")
  fixture_id: number; // Fixture ID
  id: number; // Score ID
  participant_id: number; // Participant ID
  score: {
    goals: number; // Number of goals scored
    participant: string; // Participant (e.g., "away")
  };
  type_id: number; // Type ID of the score
}

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
  fixtures: Fixture[]; // Array of matches in the round
  games_in_current_week: boolean; // Indicates if games are in the current week
  is_current: boolean; // Indicates if this is the current round
}

export interface Fixture {
  aggregate_id: number | null; // Aggregate ID (nullable)
  details: string | null; // Additional details (nullable)
  group_id: number | null; // Group ID (nullable)
  has_odds: boolean; // Indicates if odds are available
  has_premium_odds: boolean; // Indicates if premium odds are available
  id: number; // Fixture ID
  league_id: number; // League ID
  leg: string; // Match leg (e.g., "1/1")
  length: number; // Match length in minutes
  name: string; // Match name (e.g., "Newcastle United vs Crystal Palace")
  placeholder: boolean; // Indicates if this is a placeholder match
  result_info: string | null; // Additional result information (nullable)
  round_id: number; // Round ID
  scores: Scores[]; // Array of scores (if available)
  season_id: number; // Season ID
  sport_id: number; // Sport ID
  stage_id: number; // Stage ID
  starting_at: string; // Match start time (YYYY-MM-DD HH:mm:ss)
  starting_at_timestamp: number; // Match start time as a Unix timestamp
  state: State; // State object
  state_id: number; // State ID
  venue_id: number; // Venue ID
  venue: Venue; // Venue object
}

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

export interface State {
  developer_name: string; // Developer name of the state
  id: number; // State ID
  name: string; // State name (e.g., "FT")
  short_name: string; // Short name of the state (e.g., "FT")
  state: string; // State code (e.g., "FT")
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

export interface StandingTeam {
  group_id: number | null;
  id: number; 
  league_id: number;
  participant: Participant;
  participant_id: number;
  points: number; // Points earned by the team
  position: number; // Position in the standings
  result: string; // Result of the match (e.g., "up", "down")
  round_id: number; // Round ID
  season_id: number; // Season ID
  sport_id: number; // Sport ID
  stage_id: number; // Stage ID
  standing_rule_id: number; // Standing rule ID
  details: Details[]; // Array of details
  rule: Rule; // Rule object
}
export interface Details {
  id: number; // Detail ID
  standing_id: number; // Standing ID
  standing_type: string; // Type of standing (e.g., "standing")
  type: Type; // Type object
  type_id: number; // Type ID
  value: number; // Value of the detail (e.g., goals scored)
}

export interface Rule {
  id: number; // Rule ID
  model_id: number; // Model ID
  model_type: string; // Model type (e.g., "stage")
  position: number; // Position in the standings
  type: Type; // Type object
  type_id: number; // Type ID

}

export interface TopScorer {
  id: number; // Top scorer ID
  participant_id: number; // ID of the participant (team)
  participant: Participant; // Participant object
  playerr_id: number; // ID of the player
  player: PlayerDetails; // Player object
  position: number; // Position of the player in the top scorers list
  season_id: number; // Season ID
  season: Season; // Season object
  total: number; // Total goals scored by the player
  type_id: number; // Type ID of the top scorer
  type: Type; // Type object

}

export interface PlayerDetails {
  id: number; // Player ID
  first_name: string; // First name of the player
  last_name: string; // Last name of the player
  display_name: string; // Display name of the player
  common_name: string; // Common name of the player
  date_of_birth: string; // Date of birth (YYYY-MM-DD)
  gender: string;
  height: number; // Height of the player in cm
  weight: number; // Weight of the player in kg
  nationality_id: number
  nationality: Nationality
  country_id: number; // Country ID
  city_id: number; // City ID
  position_id: number; // Position ID
  position: Position; // Position object
  detailed_position_id: number; // Detailed position ID
  sport_id: number; // Sport ID
  type_id: number; // Type ID
  image_path: string; // URL to the player's image
}

export interface Player {
  captain: boolean; // Indicates if the player is a captain
  detailed_position_id: number; // Detailed position ID
  end: string; // End date of the contract (YYYY-MM-DD)
  id: number; // Player ID
  jersey_number: number; // Jersey number of the player
  player: PlayerDetails; // Player details object
  player_id: number; // Player ID
  position_id: number; // Position ID
  start: string; // Start date of the contract (YYYY-MM-DD)
  team_id: number; // Team ID
  transfer_id: number | null; // Transfer ID (nullable)
}

export interface Nationality {
  border: string[]; // Array of bordering countries
  continent_id: number; // Continent ID
  fifa_name: string; // FIFA name of the country
  id: number; // Country ID
  image_path: string; // URL to the country's image
  iso2: string; // ISO 3166-1 alpha-2 code
  iso3: string; // ISO 3166-1 alpha-3 code
  latitude: string; // Latitude of the country
  longitude: string; // Longitude of the country
  name: string; // Country name
  official_name: string; // Official name of the country
}

export interface Position {
  code: string; // Position code (e.g., "midfielder")
  developer_name: string; // Developer name of the position
  id: number; // Position ID
  model_type: string; // Model type of the position
  name: string; // Name of the position (e.g., "Midfielder")
  stat_group: string | null; // Stat group (nullable)
}

export interface Season {
  ending_at: string; // End date of the season (YYYY-MM-DD)
  finished: boolean; // Indicates if the season is finished
  games_in_current_week: boolean; // Indicates if games are in the current week
  id: number; // Season ID
  is_current: boolean; // Indicates if this is the current season
  league: League; // League object
  league_id: number; // League ID
  name: string; // Season name (e.g., "2024/2025")
  pending: boolean; // Indicates if the season is pending
  sport_id: number; // Sport ID
  standings_recalculated_at: string; // Last recalculated date (YYYY-MM-DD HH:mm:ss)
  starting_at: string; // Start date of the season (YYYY-MM-DD)
  tie_breaker_rule_id: number; // Tie breaker rule ID
}

export interface Type {
  code: string; // Type code (e.g., "goal")
  developer_name: string; // Developer name of the type
  id: number; // Type ID
  model_type: string; // Model type of the type
  name: string; // Name of the type (e.g., "Goal")
  stat_group: string | null; // Stat group (nullable)
}

export interface FullParticipant extends Participant {
  latest: LatestUpcoming[]; // Array of latest matches
  upcoming: LatestUpcoming[]; // Array of upcoming matches
  venue: Venue; // Venue object
  players: Player[]; // Array of players in the team
  coaches: Coach[]; // Array of coaches in the team

}

export interface Coach {
  active: boolean; // Indicates if the coach is active
  coach_id: number; // Coach ID
  coach: CoachDetails; // Coach details object
  id: number; // Coach ID
  position_id: number; // Position ID
  start: string; // Start date of the contract (YYYY-MM-DD)
  team_id: number; // Team ID
  temporary: boolean; // Indicates if the coach is temporary
  end: string; // End date of the contract (YYYY-MM-DD)


}

export interface CoachDetails {
  city_id: number | null; // City ID (nullable)
  common_name: string; // Common name of the coach
  country_id: number; // Country ID
  date_of_birth: string; // Date of birth (YYYY-MM-DD)
  display_name: string; // Display name of the coach
  firstname: string; // First name of the coach
  gender: string; 
  height: number; // Height of the coach in cm
  id: number; // Coach ID
  image_path: string; // URL to the coach's image
  lastname: string; // Last name of the coach
  name: string; // Name of the coach (e.g., "Jürgen Klopp")
  nationality_id: number
  player_id: number; // Player ID
  sport_id: number; // Sport ID
  weight: number; // Weight of the coach in kg
}

export interface LatestUpcoming {
  aggregate_id: number | null; // Aggregate ID (nullable)
  details: string | null; // Additional details (nullable)
  group_id: number | null; // Group ID (nullable)
  has_odds: boolean; // Indicates if odds are available
  has_premium_odds: boolean; // Indicates if premium odds are available
  id: number; // Latest ID
  league_id: number; // League ID
  leg: string; // Match leg (e.g., "1/1")
  length: number; // Match length in minutes
  meta: { location: string }; // Metadata (e.g., location)
  name: string; // Match name (e.g., "FC Barcelona vs Real Betis")
  placeholder: boolean; // Indicates if this is a placeholder match
  result_info: string | null; // Additional result information (nullable)
  round_id: number; // Round ID
  season_id: number; // Season ID
  sport_id: number; // Sport ID
  stage_id: number; // Stage ID
  starting_at: string; // Match start time (YYYY-MM-DD HH:mm:ss)
  starting_at_timestamp: number; // Match start time as a Unix timestamp
  state_id: number; // State ID
  venue_id: number; // Venue ID
}

export interface Venue {
  address: string; // Venue address
  capacity: number; // Venue capacity
  city_id: number; // City ID
  city_name: string; // City name
  country_id: number; // Country ID
  id: number; // Venue ID
  image_path: string; // URL to the venue image
  latitude: string; // Latitude of the venue
  longitude: string; // Longitude of the venue
  name: string; // Venue name (e.g., "Camp Nou")
  national_team: boolean; // Indicates if this is a national team venue
  surface: string; // Surface type (e.g., "grass")
  zipcode: string; // Zip code of the venue
}

export interface LiveMatchesType extends Match {
  league: LiveLeague; // League object
  scores: Scores[]; // Array of scores (if available)
  Events: Event[]; // Array of events (if available)
  periods: Period[]; // Array of periods (if available)
}


export type LiveLeague = Omit<League, 'today'> & {
  country: Country
};

export interface Country {
  id: number; // Country ID
  continent_id: number; // Continent ID
  name: string; // Country name
  official_name: string; // Official name of the country
  fifa_name: string; // FIFA name of the country
  iso2: string; // ISO 3166-1 alpha-2 code
  iso3: string; // ISO 3166-1 alpha-3 code
  latitude: string; // Latitude of the country
  longitude: string; // Longitude of the country
  borders: string[]; // Array of bordering countries
  image_path: string; // URL to the country's image
}

export interface Event {
  id: number; // Event ID
  fixture_id: number; // Fixture ID
  period_id: number; // Period ID
  participant_id: number; // Participant ID
  type_id: number; // Type ID of the event
  section: string; // Section of the event (e.g., "event")
  player_id: number; // Player ID involved in the event
  related_player_id: number | null; // Related player ID (nullable)
  player_name: string; // Name of the player involved in the event
  related_player_name: string | null; // Name of the related player (nullable)
  result: string | null; // Result of the event (nullable)
  info: string | null; // Additional information about the event (nullable)
  addition: string | null; // Additional information about the event (nullable)
  minute: number; // Minute of the event
  extra_minute: number | null; // Extra minute of the event (nullable)
  injured: boolean | null; // Indicates if the player was injured (nullable)
  on_bench: boolean | null; // Indicates if the player was on the bench (nullable)
  coach_id: number | null; // Coach ID (nullable)
  sub_type_id: number | null; // Subtype ID of the event (nullable)
  detailed_period_id: number | null; // Detailed period ID (nullable)
  sort_order: number | null; // Sort order of the event (nullable)
  type: Type; // Type object of the event
}


export interface Period {
  id: number; // Period ID
  fixture_id: number; // Fixture ID
  type_id: number; // Type ID of the period
  started: number; // Start time of the period as a Unix timestamp
  ended: number; // End time of the period as a Unix timestamp
  ticking: boolean; // Indicates if the period is currently ticking
  sort_order: number; // Sort order of the period
  description: string; // Description of the period (e.g., "1st half")
  time_added: number; // Time added to the period
  minutes: number; // Minutes of the period
  seconds: number; // Seconds of the period
  has_timer: boolean; // Indicates if the period has a timer
}