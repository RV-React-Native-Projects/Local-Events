import EncryptedStorage from 'react-native-encrypted-storage';
import { SecureKeys } from './keys';

class SecureStorage {
  private static instance: SecureStorage;

  // Private constructor to restrict instantiation
  private constructor() {}

  // Static method to provide the single instance
  public static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage();
    }
    return SecureStorage.instance;
  }

  // Method to save data securely
  async setItem(key: SecureKeys, value: string): Promise<void> {
    try {
      await EncryptedStorage.setItem(key, value);
    } catch (error) {
      console.log('Error saving data to secure storage:', error);
      throw new Error('Failed to save data');
    }
  }

  // Method to retrieve data securely
  async getItem(key: SecureKeys): Promise<string | null> {
    try {
      const value = await EncryptedStorage.getItem(key);
      return value;
    } catch (error) {
      console.log('Error retrieving data from secure storage:', error);
      throw new Error('Failed to retrieve data');
    }
  }

  // Method to remove data securely
  async removeItem(key: SecureKeys): Promise<void> {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      console.log('Error removing data from secure storage:', error);
      throw new Error('Failed to remove data');
    }
  }

  // Method to clear all secure storage
  async clear(): Promise<void> {
    try {
      await EncryptedStorage.clear();
    } catch (error) {
      console.log('Error clearing secure storage:', error);
      throw new Error('Failed to clear storage');
    }
  }
}

// Export the single instance
export default SecureStorage.getInstance();
