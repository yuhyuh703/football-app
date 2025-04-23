import React from 'react';
import { View } from 'react-native';
import { Skeleton } from 'moti/skeleton'

export default function SkeletonComponent() {
    return (
        <View >
          
          <View style={{marginBottom: 10}}>
          <Skeleton
              width={"100%"}
              height={80}
              colorMode="light"
              backgroundColor="#e0e0e0"
          />
          </View>
          <View style={{marginBottom: 20}}>
          <Skeleton
              width={"100%"}
              height={80}
              colorMode="light"
              backgroundColor="#e0e0e0"
          />
          </View>
        </View>
    );
}