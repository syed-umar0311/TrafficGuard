import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

export const Button = ({
  title = 'Button',
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary', // 'primary', 'secondary', 'danger', 'success', 'ghost'
  icon = null,
  fullWidth = false,
  size = 'md',
  className = '',
}) => {
  const variantClasses = {
    primary: 'bg-primary active:opacity-90',
    secondary: 'bg-secondary active:opacity-90',
    danger: 'bg-danger active:opacity-90',
    success: 'bg-success active:opacity-90',
    ghost: 'bg-transparent active:bg-gray-100',
  };

  const textColorClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    danger: 'text-white',
    success: 'text-white',
    ghost: 'text-gray-800',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 rounded-lg',
    md: 'px-6 py-3 rounded-lg',
    lg: 'px-8 py-4 rounded-xl',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50' : ''}
        flex-row items-center justify-center
        ${variant !== 'ghost' ? 'shadow-sm' : ''}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'ghost' ? '#374151' : 'white'} 
          size="small" 
        />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`
            ${textSizeClasses[size]} 
            ${textColorClasses[variant]} 
            font-semibold
          `}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export const PrimaryButton = ({
  title = 'Button',
  onPress,
  loading = false,
  disabled = false,
  icon = null,
  fullWidth = false,
  size = 'md', // 'sm', 'md', 'lg'
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 rounded-lg',
    md: 'px-6 py-3 rounded-lg',
    lg: 'px-8 py-4 rounded-xl',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg font-semibold',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        bg-primary
        ${disabled ? 'opacity-50' : 'active:opacity-90'}
        flex-row items-center justify-center
        shadow-sm
      `}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`${textSizeClasses[size]} text-white font-semibold`}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};



export const SecondaryButton = ({
  title = 'Button',
  onPress,
  loading = false,
  disabled = false,
  icon = null,
  fullWidth = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 rounded-lg border',
    md: 'px-6 py-3 rounded-lg border',
    lg: 'px-8 py-4 rounded-xl border-2',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg font-semibold',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        border-primary
        bg-transparent
        ${disabled ? 'opacity-50' : 'active:bg-blue-50'}
        flex-row items-center justify-center
      `}
    >
      {loading ? (
        <ActivityIndicator color="#3B82F6" size="small" />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`${textSizeClasses[size]} text-primary font-semibold`}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
