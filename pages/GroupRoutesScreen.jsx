import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AddButton from "../common/AddButton";
import { PrimaryButton } from "../common/Button";

const GroupRoutesScreen = ({ route, navigation }) => {
  const { groupId, groupName } = route.params || {};
  
  // Sample routes data - in real app, you might fetch this based on groupId
  const [routes, setRoutes] = useState([
    { id: "1", name: "Route A", distance: "5.2", unit: "km", groupId: "1" },
    { id: "2", name: "Route B", distance: "3.8", unit: "km", groupId: "1" },
    { id: "3", name: "Main Street", distance: "7.5", unit: "km", groupId: "2" },
    { id: "4", name: "Park Loop", distance: "2.5", unit: "km", groupId: "3" },
  ]);
  
  const [showAddRoutePopup, setShowAddRoutePopup] = useState(false);
  const [newRouteName, setNewRouteName] = useState("");
  const [newRouteDistance, setNewRouteDistance] = useState("");
  const insets = useSafeAreaInsets();
  
  // Filter routes for this specific group
  const groupRoutes = routes.filter(route => route.groupId === groupId);

  // Add Route Popup Component
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
              <View className="border border-gray-300 rounded-lg p-3 bg-white">
                <TextInput
                  className="text-gray-900 text-base"
                  placeholder="Enter route name"
                  value={newRouteName}
                  onChangeText={setNewRouteName}
                />
              </View>
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Distance (km)
              </Text>
              <View className="border border-gray-300 rounded-lg p-3 bg-white">
                <TextInput
                  className="text-gray-900 text-base"
                  placeholder="Enter distance in km"
                  value={newRouteDistance}
                  onChangeText={setNewRouteDistance}
                  keyboardType="numeric"
                />
              </View>
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
                  onPress={() => {
                    if (newRouteName.trim() && newRouteDistance.trim()) {
                      onSave({
                        name: newRouteName.trim(),
                        distance: newRouteDistance.trim(),
                        unit: "km"
                      });
                      setNewRouteName("");
                      setNewRouteDistance("");
                      onClose();
                    } else {
                      Alert.alert("Error", "Please fill in all fields");
                    }
                  }}
                  fullWidth={true}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const handleAddRoute = (routeData) => {
    const newRoute = {
      ...routeData,
      id: Date.now().toString(),
      groupId: groupId,
    };
    setRoutes(prev => [newRoute, ...prev]);
    Alert.alert("Success", "Route added successfully!");
  };

  const handleDeleteRoute = (routeId) => {
    Alert.alert("Delete Route", "Are you sure you want to delete this route?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setRoutes(prev => prev.filter(route => route.id !== routeId));
        },
      },
    ]);
  };

  const RouteCard = ({ route }) => (
    <View className="bg-white rounded-xl p-4 mb-3 border border-gray-200">
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
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        className="flex-1"
      >
        {/* Header */}
        <View className="bg-white border-b border-gray-200 px-5">
          <View className="flex-row items-center py-4">
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              className="mr-4"
            >
              <MaterialIcons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            
            <View className="flex-1">
              <Text className="text-xl font-semibold text-gray-900">
                {groupName || "Group Routes"}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                {groupRoutes.length} routes in this group
              </Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="flex-1">
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 90,
            }}
          >
            {groupRoutes.length === 0 ? (
              <View className="items-center justify-center py-20">
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
                {groupRoutes.map((route) => (
                  <RouteCard key={route.id} route={route} />
                ))}
              </View>
            )}
          </ScrollView>
        </View>

        {/* Add Button */}
        <AddButton
          onPress={() => setShowAddRoutePopup(true)}
          className="absolute bottom-6 right-6"
        />

        {/* Add Route Popup */}
        <AddRoutePopup
          visible={showAddRoutePopup}
          onClose={() => setShowAddRoutePopup(false)}
          onSave={handleAddRoute}
        />
      </SafeAreaView>
    </View>
  );
};

export default GroupRoutesScreen;