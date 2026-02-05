import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AddButton from "../common/AddButton";

const GroupRoutesScreen = ({ route, navigation }) => {
  const {
    groupId,
    groupName,
    routes: initialRoutes = [],
    onAddRoute,
    onDeleteRoute,
  } = route.params || {};

  const [routes, setRoutes] = useState(initialRoutes);

  // Update routes when params change
  useEffect(() => {
    if (initialRoutes) {
      setRoutes(initialRoutes);
    }
  }, [initialRoutes]);

  const handleAddRoute = () => {
    // Navigate to MapRouteScreen with OSM
    navigation.navigate("MapRouteScreen", {
      groupId,
      onSaveRoute: handleSaveRouteFromMap,
    });
  };

  const handleSaveRouteFromMap = (newRoute) => {
    // Update local state
    const updatedRoutes = [...routes, newRoute];
    setRoutes(updatedRoutes);
    
    // Call parent callback if provided
    if (onAddRoute) {
      onAddRoute(newRoute);
    }
    
    // Show success message
    Alert.alert("Success", "Route added successfully!");
  };

  const handleDeleteRoute = (routeId) => {
    Alert.alert("Delete Route", "Are you sure you want to delete this route?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          // Update local state
          const updatedRoutes = routes.filter((route) => route.id !== routeId);
          setRoutes(updatedRoutes);

          // Call parent callback if provided
          if (onDeleteRoute) {
            onDeleteRoute(routeId);
          }

          Alert.alert("Success", "Route deleted successfully!");
        },
      },
    ]);
  };

  const formatDuration = (duration) => {
    if (!duration) return "";
    
    if (typeof duration === "string") {
      return `• ${duration}`;
    }
    
    return `• ${duration} mins`;
  };

  const RouteCard = ({ route }) => (
    <View className="bg-white rounded-xl p-4 mb-3 mx-4 border border-gray-200 shadow-sm">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center flex-1">
          <View className="w-12 h-12 rounded-lg bg-blue-100 items-center justify-center mr-3">
            <MaterialIcons name="directions" size={24} color="#3B82F6" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-900 mb-1">
              {route.name}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-600 font-medium">
                {route.distance} {route.unit || "km"}
              </Text>
              {route.duration && (
                <Text className="text-sm text-gray-600 ml-2">
                  {formatDuration(route.duration)}
                </Text>
              )}
            </View>
            {route.createdAt && (
              <Text className="text-xs text-gray-400 mt-1">
                Added {new Date(route.createdAt).toLocaleDateString()}
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleDeleteRoute(route.id)}
          className="p-2 ml-2"
        >
          <MaterialIcons name="delete-outline" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>
      
      {/* Route coordinates summary */}
      {route.origin && route.destination && (
        <View className="mt-3 pt-3 border-t border-gray-100">
          <View className="flex-row items-center">
            <View className="flex-row items-center flex-1">
              <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center mr-2">
                <MaterialIcons name="location-on" size={12} color="white" />
              </View>
              <Text className="text-xs text-gray-600" numberOfLines={1}>
                {route.origin.latitude.toFixed(4)}, {route.origin.longitude.toFixed(4)}
              </Text>
            </View>
            
            <MaterialIcons name="arrow-forward" size={16} color="#9CA3AF" className="mx-2" />
            
            <View className="flex-row items-center flex-1">
              <View className="w-6 h-6 rounded-full bg-red-500 items-center justify-center mr-2">
                <MaterialIcons name="location-on" size={12} color="white" />
              </View>
              <Text className="text-xs text-gray-600" numberOfLines={1}>
                {route.destination.latitude.toFixed(4)}, {route.destination.longitude.toFixed(4)}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header - Fixed at top */}
      <View className="bg-white border-b border-gray-200 pt-2 shadow-sm">
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
              {routes.length} {routes.length === 1 ? "route" : "routes"} in this group
            </Text>
          </View>
          
          {routes.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Total Distance", 
                  `Total distance of all routes: ${routes.reduce((total, route) => {
                    const distance = parseFloat(route.distance) || 0;
                    return total + distance;
                  }, 0).toFixed(1)} km`
                );
              }}
              className="ml-2"
            >
              <MaterialIcons name="info-outline" size={22} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content Area - Takes remaining space */}
      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-24 pt-4"
        >
          {routes.length === 0 ? (
            <View className="items-center justify-center py-20 px-4">
              <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-4">
                <MaterialIcons name="map" size={48} color="#9CA3AF" />
              </View>
              <Text className="text-lg font-medium text-gray-500 mb-2">
                No routes yet
              </Text>
              <Text className="text-gray-400 text-center text-sm mb-6 px-8">
                Add your first route by tapping the + button below
              </Text>
              <TouchableOpacity
                onPress={handleAddRoute}
                className="flex-row items-center bg-blue-500 px-4 py-3 rounded-lg"
              >
                <MaterialIcons name="add" size={20} color="white" />
                <Text className="text-white font-medium ml-2">Add Your First Route</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View className="px-4 mb-4">
                <Text className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Saved Routes ({routes.length})
                </Text>
              </View>
              
              {routes.map((route) => (
                <RouteCard key={route.id} route={route} />
              ))}
              
              <View className="items-center mt-8 mb-4">
                <Text className="text-gray-400 text-sm">
                  Tap + to add more routes
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Add Button - Fixed at bottom right */}
      <View className="absolute bottom-6 right-6 z-10">
        <AddButton onPress={handleAddRoute} />
      </View>
    </SafeAreaView>
  );
};

export default GroupRoutesScreen;