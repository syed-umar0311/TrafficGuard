import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AddButton = ({ 
  onPress, 
  className = '', 
  iconColor = '#FFFFFF',
  iconSize = 24,
  position = 'absolute',
  showShadow = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className={`${position} bottom-6 right-6 w-14 h-14 rounded-full bg-primary 
        items-center justify-center ${showShadow ? 'shadow-lg shadow-black/25' : ''}
        active:opacity-90 z-50 ${className}`}
      style={{
        elevation: showShadow ? 5 : 0, // For Android shadow
      }}
    >
      <MaterialIcons name="add" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export default AddButton;