import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AddButton = ({ 
  onPress, 
  className = '',
  iconSize = 28,
  position = 'absolute',
  showShadow = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className={`${position} bottom-1 right-1 w-16 h-16 rounded-full bg-primary 
        items-center justify-center ${showShadow ? 'shadow-lg shadow-primary/40' : ''}
        active:opacity-90 z-50 border-4 border-white ${className}`}
      style={{
        elevation: showShadow ? 8 : 0,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      }}
    >
      <MaterialIcons name="add" size={iconSize} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

export default AddButton;