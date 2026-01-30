import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AddButton from "../common/AddButton";
import AddGroupPopup from "../popups/AddGroupPopup";
import { PrimaryButton, SecondaryButton } from "../common/Button";

const AddGroupScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([
    {
      id: "1",
      name: "Morning Patrol",
      startTime: "06:00 AM",
      endTime: "10:00 AM",
      members: 5,
      status: "active",
    },
    {
      id: "2",
      name: "Evening Shift",
      startTime: "04:00 PM",
      endTime: "08:00 PM",
      members: 8,
      status: "active",
    },
    {
      id: "3",
      name: "Night Watch",
      startTime: "10:00 PM",
      endTime: "06:00 AM",
      members: 4,
      status: "inactive",
    },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const insets = useSafeAreaInsets();

  const handleSaveGroup = (groupData) => {
    const newGroup = {
      ...groupData,
      id: Date.now().toString(),
      members: Math.floor(Math.random() * 10) + 1,
      status: "active",
    };
    setGroups((prev) => [newGroup, ...prev]);
    Alert.alert("Success", "Group added successfully!");
  };

  const handleDeleteGroup = (id) => {
    Alert.alert("Delete Group", "Are you sure you want to delete this group?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setGroups((prev) => prev.filter((group) => group.id !== id));
        },
      },
    ]);
  };

  const handleToggleStatus = (id) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === id
          ? {
              ...group,
              status: group.status === "active" ? "inactive" : "active",
            }
          : group,
      ),
    );
  };

  const GroupCard = ({ group }) => (
    <View className="bg-white rounded-xl p-3 mb-3 border border-gray-200">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <View className="w-9 h-9 rounded-lg bg-primary/10 items-center justify-center mr-3">
              <MaterialIcons name="map" size={18} color="#3B82F6" />
            </View>
            <View className="flex-1 flex-row items-center">
              <Text className="text-base font-semibold text-gray-900">
                {group.name}
              </Text>

              {/* Status badge with minimal spacing */}
              <View
                className={`px-2 py-1 rounded-full ml-2 ${group.status === "active" ? "bg-green-100" : "bg-gray-100"}`}
              >
                <Text
                  className={`text-xs font-medium ${group.status === "active" ? "text-green-800" : "text-gray-600"}`}
                >
                  {group.status === "active" ? "Active" : "Inactive"}
                </Text>
              </View>
            </View>
          </View>

          {/* Group details */}
          <View className="ml-12">
            <View className="flex-row items-center mb-1">
              <MaterialIcons name="access-time" size={14} color="#6B7280" />
              <Text className="text-sm text-gray-600 ml-2">
                {group.startTime} - {group.endTime}
              </Text>
            </View>
            <View className="flex-row items-center">
              <MaterialIcons name="directions" size={14} color="#6B7280" />
              <Text className="text-sm text-gray-600 ml-2">
                {group.members} Routes in this group
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleDeleteGroup(group.id)}
          className="p-1 self-start"
        >
          <MaterialIcons name="delete-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Action buttons */}
      <View className="flex-row mt-3 pt-3 border-t border-gray-100 gap-2">
        <View className="flex-1">
          <SecondaryButton
            title="Add Route"
            onPress={() =>
              navigation.navigate("GroupRoutesScreen", {
                groupId: group.id,
                groupName: group.name,
              })
            }
            size="sm"
            fullWidth={true}
          />
        </View>
        <View className="flex-1">
          <PrimaryButton
            title={group.status === "active" ? "Deactivate" : "Activate"}
            onPress={() => handleToggleStatus(group.id)}
            size="sm"
            fullWidth={true}
            variant={group.status === "active" ? "danger" : "success"}
          />
        </View>
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
          <View className="flex-row justify-between items-center py-4">
            <Text className="text-2xl font-semibold text-gray-900">
              Route Groups
            </Text>

            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-primary/20 items-center justify-center mr-2">
                <MaterialIcons name="person" size={16} color="#3B82F6" />
              </View>
              <Text className="text-sm font-medium text-gray-900">
                John Doe
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
            {groups.length === 0 ? (
              <View className="items-center justify-center py-20">
                <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-4">
                  <MaterialIcons name="groups" size={40} color="#9CA3AF" />
                </View>
                <Text className="text-base font-medium text-gray-500 mb-2">
                  No groups yet
                </Text>
                <Text className="text-gray-400 text-center text-sm mb-6">
                  Tap + button to create your first group
                </Text>
              </View>
            ) : (
              <View>
                {groups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </View>
            )}
          </ScrollView>
        </View>

        {/* Add Button */}
        <AddButton
          onPress={() => setShowPopup(true)}
          className="absolute bottom-6 right-6"
        />

        {/* Add Group Popup */}
        <AddGroupPopup
          visible={showPopup}
          onClose={() => setShowPopup(false)}
          onSave={handleSaveGroup}
        />
      </SafeAreaView>
    </View>
  );
};

export default AddGroupScreen;
