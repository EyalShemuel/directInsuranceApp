import 'expo-router';

declare module 'expo-router' {
  interface RelativePathString {
    '/(auth)': never;
  }
}