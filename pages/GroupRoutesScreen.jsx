import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AddButton from "../common/AddButton";
import { PrimaryButton } from "../common/Button";

const GroupRoutesScreen = ({ route, navigation }) => {
  const { 
    groupId, 
    groupName, 
    routes: initialRoutes = [],
    onAddRoute,
    onDeleteRoute 
  } = route.params || {};
  
  const [routes, setRoutes] = useState(initialRoutes);
  // // const [showAddRoutePopup, setShowAddRoutePopup] = useState(false);
  // const [newRouteName, setNewRouteName] = useState("");
  // const [newRouteDistance, setNewRouteDistance] = useState("");

  // Update routes when params change
  useEffect(() => {
    if (initialRoutes) {
      setRoutes(initialRoutes);
    }
  }, [initialRoutes]);



  const handleDeleteRoute = (routeId) => {
    Alert.alert("Delete Route", "Are you sure you want to delete this route?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          // Update local state
          setRoutes(prev => prev.filter(route => route.id !== routeId));
          
          // Call parent callback if provided
          if (onDeleteRoute) {
            onDeleteRoute(routeId);
          }
          
          Alert.alert("Success", "Route deleted successfully!");
        },
      },
    ]);
  };

  const AddRoutePopup = ({ visible, onClose, onSave }) => {
    if (!visible) return null;

    return (
      <View className="absolute inset-0 bg-black/50 justify-center items-center z-50">
        <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-900">
              Add New Route
            </Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <MaterialIcons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Route Name
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white text-base"
                placeholder="Enter route name"
                value={newRouteName}
                onChangeText={setNewRouteName}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Distance (km)
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white text-base"
                placeholder="Enter distance in km"
                value={newRouteDistance}
                onChangeText={setNewRouteDistance}
                keyboardType="numeric"
              />
            </View>

            <View className="flex-row space-x-3 pt-2">
              <View className="flex-1">
                <PrimaryButton
                  title="Cancel"
                  onPress={onClose}
                  variant="secondary"
                  fullWidth={true}
                />
              </View>
              <View className="flex-1">
                <PrimaryButton
                  title="Save Route"
                  onPress={handleSaveRoute}
                  fullWidth={true}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const RouteCard = ({ route }) => (
    <View className="bg-white rounded-xl p-4 mb-3 mx-4 border border-gray-200">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 rounded-lg bg-blue-100 items-center justify-center mr-3">
            <MaterialIcons name="directions" size={20} color="#3B82F6" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-900">
              {route.name}
            </Text>
            <Text className="text-sm text-gray-600 mt-1">
              {route.distance} {route.unit}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          onPress={() => handleDeleteRoute(route.id)}
          className="p-2"
        >
          <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header - Fixed at top */}
      <View className="bg-white border-b border-gray-200 pt-2">
        <View className="flex-row items-center px-4 pb-4">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="mr-3"
          >
            <MaterialIcons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          
          <View className="flex-1">
            <Text className="text-xl font-semibold text-gray-900">
              {groupName || "Group Routes"}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              {routes.length} routes in this group
            </Text>
          </View>
        </View>
      </View>

      {/* Content Area - Takes remaining space */}
      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-20 pt-4"
        >
          {routes.length === 0 ? (
            <View className="items-center justify-center py-20 px-4">
              <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-4">
                <MaterialIcons name="map" size={40} color="#9CA3AF" />
              </View>
              <Text className="text-base font-medium text-gray-500 mb-2">
                No routes in this group
              </Text>
              <Text className="text-gray-400 text-center text-sm mb-6">
                Tap + button to add your first route
              </Text>
            </View>
          ) : (
            <View>
              {routes.map((route) => (
                <RouteCard key={route.id} route={route} />
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      {/* Add Button - Fixed at bottom right */}
      <View className="absolute bottom-6 right-6 z-10">
        <AddButton
          onPress={() => console.log("Add Route Pressed") }
        />
      </View>    
    </SafeAreaView>
  );
};

export default GroupRoutesScreen;