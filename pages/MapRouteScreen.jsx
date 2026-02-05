import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import MapView, { Marker, Polyline } from "react-native-maps";
import { PrimaryButton } from "../common/Button";
import * as Location from 'expo-location';

const MapRouteScreen = ({ navigation, route }) => {
  const { groupId, onSaveRoute } = route.params || {};
  
  const [routeName, setRouteName] = useState("");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [originQuery, setOriginQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [isSelectingOrigin, setIsSelectingOrigin] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);
        getCurrentLocation();
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      
      setUserLocation(userCoords);
      
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          ...userCoords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 1000);
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const geocodeLocation = async (query) => {
    if (!query.trim()) {
      return null;
    }

    try {
      const results = await Location.geocodeAsync(query.trim());

      if (!Array.isArray(results) || results.length === 0) {
        Alert.alert("Location not found", "Try a different place name or address.");
        return null;
      }

      const match = results[0];

      return {
        latitude: match.latitude,
        longitude: match.longitude,
      };
    } catch (error) {
      console.error("Error geocoding location:", error);
      Alert.alert(
        "Error",
        "Unable to search for this place right now. Please check your internet connection and try again."
      );
      return null;
    }
  };

  const fetchRouteFromOSM = async (start, end) => {
    try {
      const url =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${start.longitude},${start.latitude};${end.longitude},${end.latitude}` +
        `?overview=full&geometries=geojson`;

      const response = await fetch(url);
      const data = await response.json();

      if (
        !data ||
        data.code !== "Ok" ||
        !Array.isArray(data.routes) ||
        data.routes.length === 0
      ) {
        console.warn("OSM routing error:", data?.code);
        const fallbackDistance = calculateDistance(
          start.latitude,
          start.longitude,
          end.latitude,
          end.longitude
        );
        setRouteCoords([start, end]);
        setDistance(fallbackDistance);
        return;
      }

      const route = data.routes[0];
      const geometry = route.geometry;

      if (!geometry || !Array.isArray(geometry.coordinates)) {
        const fallbackDistance = calculateDistance(
          start.latitude,
          start.longitude,
          end.latitude,
          end.longitude
        );
        setRouteCoords([start, end]);
        setDistance(fallbackDistance);
        return;
      }

      const coords = geometry.coordinates.map(([lon, lat]) => ({
        latitude: lat,
        longitude: lon,
      }));

      setRouteCoords(coords);

      if (route.distance != null) {
        const km = route.distance / 1000;
        setDistance(km.toFixed(1));
      } else {
        const fallbackDistance = calculateDistance(
          start.latitude,
          start.longitude,
          end.latitude,
          end.longitude
        );
        setDistance(fallbackDistance);
      }

      if (mapRef.current && coords.length > 1) {
        mapRef.current.fitToCoordinates(coords, {
          edgePadding: { top: 80, right: 40, bottom: 140, left: 40 },
          animated: true,
        });
      }
    } catch (error) {
      console.error("Error fetching route from OSM:", error);
      const fallbackDistance = calculateDistance(
        start.latitude,
        start.longitude,
        end.latitude,
        end.longitude
      );
      setRouteCoords([start, end]);
      setDistance(fallbackDistance);
    }
  };

  const handleSearchOrigin = async () => {
    const coords = await geocodeLocation(originQuery);
    if (!coords) return;

    setOrigin(coords);
    setIsSelectingOrigin(false);

    if (destination) {
      await fetchRouteFromOSM(coords, destination);
    } else if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...coords,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        500
      );
    }
  };

  const handleSearchDestination = async () => {
    const coords = await geocodeLocation(destinationQuery);
    if (!coords) return;

    setDestination(coords);
    setIsSelectingOrigin(false);

    if (origin) {
      await fetchRouteFromOSM(origin, coords);
    } else if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...coords,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        500
      );
    }
  };

  const handleMapPress = async (event) => {
    const coordinate = event.nativeEvent.coordinate;
    
    if (isSelectingOrigin) {
      setOrigin(coordinate);
      setIsSelectingOrigin(false);
      setRouteCoords([]);
    } else {
      setDestination(coordinate);

      if (origin) {
        await fetchRouteFromOSM(origin, coordinate);
      }
    }
  };

  const handleSaveRoute = () => {
    if (!routeName.trim()) {
      Alert.alert("Error", "Please enter a route name");
      return;
    }

    if (!origin || !destination) {
      Alert.alert("Error", "Please select both origin and destination points");
      return;
    }

    const newRoute = {
      id: Date.now().toString(),
      name: routeName,
      distance: `${distance} km`,
      unit: "km",
      origin,
      destination,
      coordinates: [origin, destination],
      createdAt: new Date().toISOString(),
    };

    if (onSaveRoute) {
      onSaveRoute(newRoute);
    }

    Alert.alert("Success", "Route saved successfully!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const resetSelection = () => {
    setOrigin(null);
    setDestination(null);
    setRouteCoords([]);
    setDistance(null);
    setIsSelectingOrigin(true);
  };

  const centerOnUserLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        ...userLocation,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000);
    }
  };

  const handleUseCurrentLocation = async () => {
    if (userLocation) {
      if (isSelectingOrigin) {
        setOrigin(userLocation);
        setIsSelectingOrigin(false);
        setRouteCoords([]);
      } else {
        setDestination(userLocation);

        if (origin) {
          await fetchRouteFromOSM(origin, userLocation);
        }
      }
    } else {
      Alert.alert("Location Unavailable", "Unable to get your current location");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-4 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-3"
          >
            <MaterialIcons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900">
            Select Route
          </Text>
        </View>
      </View>

      {/* Route Information */}
      <View className="bg-white p-4 border-b border-gray-200">
        <TextInput
          className="border border-gray-300 rounded-lg p-3 bg-white text-base mb-3"
          placeholder="Enter route name (e.g., Home to Office)"
          value={routeName}
          onChangeText={setRouteName}
        />

        {/* Origin search */}
        <View className="flex-row items-center border border-gray-300 rounded-lg bg-gray-50 mb-3 px-3">
          <MaterialIcons name="place" size={20} color="#3B82F6" />
          <TextInput
            className="flex-1 ml-2 py-2 text-base"
            placeholder="Search origin (address or place)"
            value={originQuery}
            onChangeText={setOriginQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearchOrigin}
          />
          <TouchableOpacity onPress={handleSearchOrigin} className="ml-2 py-1 px-2">
            <MaterialIcons name="search" size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Destination search */}
        <View className="flex-row items-center border border-gray-300 rounded-lg bg-gray-50 mb-3 px-3">
          <MaterialIcons name="flag" size={20} color="#EF4444" />
          <TextInput
            className="flex-1 ml-2 py-2 text-base"
            placeholder="Search destination (address or place)"
            value={destinationQuery}
            onChangeText={setDestinationQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearchDestination}
          />
          <TouchableOpacity onPress={handleSearchDestination} className="ml-2 py-1 px-2">
            <MaterialIcons name="search" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
        
    

       

        {distance && (
          <View className="mt-3 flex-row justify-between items-center">
            <View className="bg-blue-50 p-3 rounded-lg flex-1">
              <Text className="text-blue-700 font-semibold text-lg">
                {distance} km
              </Text>
              <Text className="text-blue-600 text-sm">Route distance (driving)</Text>
            </View>
            
            <TouchableOpacity 
              onPress={resetSelection}
              className="flex-row items-center bg-gray-100 p-3 rounded-lg ml-2"
            >
              <MaterialIcons name="refresh" size={18} color="#374151" />
              <Text className="ml-2 text-gray-700 font-medium">Reset</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Map Container */}
      <View className="flex-1 relative">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: userLocation?.latitude || 40.7128,
            longitude: userLocation?.longitude || -74.0060,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
          showsUserLocation={locationPermission}
          showsMyLocationButton={false}
          showsTraffic={true}
        >

          {/* Origin Marker */}
          {origin && (
            <Marker
              coordinate={origin}
              title="Origin"
              description="Starting point"
            >
              <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center border-2 border-white shadow-lg">
                <MaterialIcons name="location-on" size={20} color="white" />
              </View>
            </Marker>
          )}

          {/* Destination Marker */}
          {destination && (
            <Marker
              coordinate={destination}
              title="Destination"
              description="Ending point"
            >
              <View className="w-10 h-10 bg-red-500 rounded-full items-center justify-center border-2 border-white shadow-lg">
                <MaterialIcons name="location-on" size={20} color="white" />
              </View>
            </Marker>
          )}

          {/* Draw route between points */}
          {origin && destination && (
            <Polyline
              coordinates={routeCoords.length > 1 ? routeCoords : [origin, destination]}
              strokeWidth={4}
              strokeColor="#2563EB"
            />
          )}
        </MapView>

        {/* Map Controls */}
        <View className="absolute top-4 right-4 space-y-2">
          <TouchableOpacity 
            onPress={centerOnUserLocation}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg"
          >
            <MaterialIcons name="my-location" size={22} color="#3B82F6" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => {
              if (mapRef.current) {
                mapRef.current.animateToRegion({
                  latitude: origin?.latitude || userLocation?.latitude || 40.7128,
                  longitude: origin?.longitude || userLocation?.longitude || -74.0060,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }, 500);
              }
            }}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg"
          >
            <MaterialIcons name="zoom-in" size={22} color="#374151" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => {
              if (mapRef.current) {
                mapRef.current.animateToRegion({
                  latitude: origin?.latitude || userLocation?.latitude || 40.7128,
                  longitude: origin?.longitude || userLocation?.longitude || -74.0060,
                  latitudeDelta: 0.5,
                  longitudeDelta: 0.5,
                }, 500);
              }
            }}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg"
          >
            <MaterialIcons name="zoom-out" size={22} color="#374151" />
          </TouchableOpacity>
        </View>

      </View>

      {/* Save Button */}
      <View className="bg-white border-t border-gray-200 p-4">
        <PrimaryButton
          title="Save Route"
          onPress={handleSaveRoute}
          fullWidth={true}
          disabled={!origin || !destination || !routeName.trim()}
        />
      </View>
    </SafeAreaView>
  );
};

export default MapRouteScreen;