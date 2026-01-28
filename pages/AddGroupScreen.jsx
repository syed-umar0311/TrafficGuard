import React, { useState } from 'react';

import { View, ScrollView, Text, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import AddButton from '../common/AddButton';

const AddGroupScreen = ({ navigation }) => {

  const insets = useSafeAreaInsets();


  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Use insets to avoid status bar */}
      <SafeAreaView 
        style={{ 
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View className="flex-1">
          {/* Header with safe area consideration */}
          <View className="bg-white border-b border-gray-200 px-5">
            <View className="flex-row justify-between items-center py-4">
              {/* Title on left */}
              <View className="flex-1">
                <Text className="text-2xl font-semibold text-gray-900">
                  Route Groups
                </Text>
              </View>
              
              {/* User name in top right */}
              <View className="flex-row items-center ml-4">
                <MaterialIcons name="person" size={20} color="#3B82F6" />
                <Text className="text-sm font-medium text-primary ml-2">
                  John Doe
                </Text>
              </View>
            </View>
          </View>

          {/* Scrollable content */}
          <ScrollView 
            className="flex-1" 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ 
              paddingBottom: 100, // Extra padding for bottom button
            }}
          >
            
          </ScrollView>

          {/* Fixed Add Button - Bottom Right */}
          <AddButton 
            onPress={() => console.log('Add pressed')}
            className="absolute bottom-6 right-6"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddGroupScreen;