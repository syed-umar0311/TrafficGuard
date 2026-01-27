import { Text, View } from 'react-native';
import './global.css';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <View className="bg-white p-6 rounded-lg shadow-lg mb-4">
        <Text className="text-blue-600 text-3xl font-bold mb-2">
          TrafficGuard
        </Text>
        <Text className="text-gray-600 text-base">
          Tailwind CSS is working! 🎉
        </Text>
      </View>
      
      <View className="flex-row gap-4 mt-4">
        <View className="bg-red-500 w-20 h-20 rounded-full items-center justify-center">
          <Text className="text-white font-semibold">Red</Text>
        </View>
        <View className="bg-green-500 w-20 h-20 rounded-full items-center justify-center">
          <Text className="text-white font-semibold">Green</Text>
        </View>
        <View className="bg-yellow-500 w-20 h-20 rounded-full items-center justify-center">
          <Text className="text-white font-semibold">Yellow</Text>
        </View>
      </View>
      
      <View className="mt-6 px-4 py-2 bg-purple-600 rounded-md">
        <Text className="text-white text-sm font-medium">
          Testing Tailwind Utilities
        </Text>
      </View>
    </View>
  );
}
