import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Button, SecondaryButton } from '../common/Button';

export default function Login({ navigation }) {
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
          Welcome back
        </Text>
        <Text className="text-gray-600">
          Log in to continue to your account
        </Text>
      </View>

      {/* Input fields */}
      <View className="space-y-4 mb-6">
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
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-medium text-gray-700">Password</Text>
            <TouchableOpacity onPress={() => console.log('Forgot password')}>
              <Text className="text-primary font-medium">Forgot?</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="••••••••"
            secureTextEntry
            className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Login button */}
      <Button
        title="Sign in"
        onPress={() => console.log('Login pressed')}
        variant="primary"
        fullWidth
        className="rounded-xl py-3 mb-6"
      />

      {/* Divider */}
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500 text-sm">Or continue with</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Google Sign In */}
      <TouchableOpacity
        className="flex-row items-center justify-center border border-gray-300 rounded-xl py-3 mb-6 bg-white"
        onPress={() => console.log('Google login')}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
          className="w-5 h-5 mr-3"
        />
        <Text className="text-gray-700 font-medium">Sign in with Google</Text>
      </TouchableOpacity>

      {/* Sign up link */}
      <View className="flex-row justify-center items-center mt-4">
        <Text className="text-gray-600">Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text className="text-primary font-semibold">Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Footer note */}
      <View className="mt-8">
        <Text className="text-center text-gray-500 text-xs">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
}