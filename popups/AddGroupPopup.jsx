import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

const AddGroupPopup = ({ visible, onClose, onSave }) => {
  const [groupName, setGroupName] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

  const handleSave = () => {
    if (!groupName.trim()) {
      alert('Please enter a group name');
      return;
    }

    onSave({
      id: Date.now().toString(),
      name: groupName,
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
    });

    handleClose();
  };

  const handleClose = () => {
    setGroupName('');
    setStartTime(new Date());
    setEndTime(new Date());
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/60 justify-center px-4 ">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View className="bg-white overflow-hidden border border-black " style={{ borderRadius: 20 }}>

            {/* Header */}
            <View className="px-5 py-4 border-b border-gray-200 flex-row justify-between items-center">
              <Text className="text-lg font-semibold text-gray-900">
                Create New Group
              </Text>
              <TouchableOpacity onPress={handleClose}>
                <MaterialIcons name="close" size={22} color="#4B5563" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ padding: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Group Name */}
              <View className="mb-5">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Group Name
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900"
                  placeholder="Enter group name"
                  placeholderTextColor="#9CA3AF"
                  value={groupName}
                  onChangeText={setGroupName}
                />
              </View>

              {/* Start Time */}
              <View className="mb-5">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </Text>
                <TouchableOpacity
                  className="border border-gray-300 rounded-xl px-4 py-3 flex-row justify-between items-center"
                  onPress={() => setShowStartPicker(true)}
                >
                  <Text className="text-sm text-gray-900">
                    {formatTime(startTime)}
                  </Text>
                  <MaterialIcons name="access-time" size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* End Time */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  End Time
                </Text>
                <TouchableOpacity
                  className="border border-gray-300 rounded-xl px-4 py-3 flex-row justify-between items-center"
                  onPress={() => setShowEndPicker(true)}
                >
                  <Text className="text-sm text-gray-900">
                    {formatTime(endTime)}
                  </Text>
                  <MaterialIcons name="access-time" size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Pickers */}
              {showStartPicker && (
                <DateTimePicker
                  value={startTime}
                  mode="time"
                  display="spinner"
                  onChange={(e, d) => {
                    setShowStartPicker(false);
                    d && setStartTime(d);
                  }}
                />
              )}

              {showEndPicker && (
                <DateTimePicker
                  value={endTime}
                  mode="time"
                  display="spinner"
                  onChange={(e, d) => {
                    setShowEndPicker(false);
                    d && setEndTime(d);
                  }}
                />
              )}
            </ScrollView>

            {/* Footer */}
            <View className="px-5 py-4 border-t border-gray-200 flex-row space-x-3">
             

              <TouchableOpacity
                className="flex-1 bg-primary rounded-xl py-3 gap-1"
                onPress={handleSave}
              >
                <Text className="text-center text-sm font-semibold text-white">
                  Create Group
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default AddGroupPopup;
