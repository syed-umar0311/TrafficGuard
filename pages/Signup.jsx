import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Button, SecondaryButton } from '../common/Button';

export default function Signup({ navigation }) {
  return (
    <View className="flex-1 bg-white px-6 justify-center">
      {/* Logo at top center */}
      <View className="items-center mb-8">
        <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-4">
          <Text className="text-white text-2xl font-bold">TG</Text>
          {/* Replace with actual logo if available */}
          {/* <Image source={require('../assets/logo.png')} className="w-12 h-12" /> */}
        </View>
        <Text className="text-3xl font-bold text-gray-800">TrafficGuard</Text>
      </View>

      {/* Welcome text */}
      <View className="mb-8">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Create account
        </Text>
        <Text className="text-gray-600">
          Sign up to start using TrafficGuard
        </Text>
      </View>

      {/* Input fields */}
      <View className="space-y-4 mb-6">
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Full name</Text>
          <TextInput
            placeholder="John Doe"
            className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
          />
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
          <TextInput
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
          <TextInput
            placeholder="••••••••"
            secureTextEntry
            className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800"
            placeholderTextColor="#9CA3AF"
          />
          <Text className="text-xs text-gray-500 mt-2">
            Use at least 8 characters with a mix of letters, numbers & symbols
          </Text>
        </View>
      </View>

      {/* Terms and conditions checkbox */}
      <View className="flex-row items-start mb-6">
        <TouchableOpacity className="w-5 h-5 border border-gray-400 rounded mr-3 mt-1 items-center justify-center">
          {/* Checkbox - you can add state to toggle this */}
          <View className="w-3 h-3 bg-primary rounded-sm" />
        </TouchableOpacity>
        <Text className="text-gray-600 text-sm flex-1">
          I agree to the{' '}
          <Text className="text-primary font-medium">Terms of Service</Text>{' '}
          and{' '}
          <Text className="text-primary font-medium">Privacy Policy</Text>
        </Text>
      </View>

      {/* Sign up button */}
      <Button
        title="Create account"
        onPress={() => console.log('Sign up pressed')}
        variant="primary"
        fullWidth
        className="rounded-xl py-3 mb-6"
      />

      {/* Divider */}
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500 text-sm">Or sign up with</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Google Sign Up */}
      <TouchableOpacity
        className="flex-row items-center justify-center border border-gray-300 rounded-xl py-3 mb-6 bg-white"
        onPress={() => console.log('Google sign up')}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
          className="w-5 h-5 mr-3"
        />
        <Text className="text-gray-700 font-medium">Sign up with Google</Text>
      </TouchableOpacity>

      {/* Login link */}
      <View className="flex-row justify-center items-center mt-4">
        <Text className="text-gray-600">Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-primary font-semibold">Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}