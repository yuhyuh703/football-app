import { FlatList } from "react-native-gesture-handler"
import { Card, Text } from "react-native-paper";
import { League, Match } from "../../types/types";
import { Touchable, TouchableOpacity } from "react-native";
import { router } from 'expo-router';

interface MatchListProps {
    matches: League[];
}
  
export default function MatchList({ matches }: MatchListProps) {

    const handleLeaguePress = (id: number) => {
        console.log('League ID:', id);
        router.push(`/league/${id}`);

    }


    return(
        <FlatList
              data={matches}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                
                <Card style={{ marginBottom: 15 }}>
                  <TouchableOpacity onPress={() => handleLeaguePress(item.id)}>
                  <Card.Title title={item.name} subtitle={`Round: ${item.today[0].round.name}`} />
                  </TouchableOpacity>
                  <Card.Content>
                    {item.today.map((match: Match, index: number) => (
                      <Card key={index} style={{ marginBottom: 10 }}>
                        <Card.Title title={match.name} subtitle={`Starting At: ${match.starting_at}`} />
                        <Card.Content>
                          <Text>{match.participants[0].name} vs {match.participants[1].name}</Text>
                          <Text>Score: {match.scores[0]?.score?.goals} - {match.scores[0]?.score?.goals}</Text>
                        </Card.Content>
                      </Card>
                    ))}
                  </Card.Content>
                </Card>
              )}
            />
    )

}