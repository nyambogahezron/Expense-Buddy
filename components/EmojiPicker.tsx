
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';

export default function EmojiPicker() {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  // Function to handle the selected emoji
  const handleEmojiSelect = (emoji:string) => {
    setSelectedEmoji(emoji);
    setShowPicker(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.pickerButton}
      >
        <Text style={styles.buttonText}>Open Emoji Picker</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        {selectedEmoji !== '' && (
          <Text style={{ fontSize: 20 }}>Selected Emoji: {selectedEmoji}</Text>
        )}
      </View>
      // To display the emoji picker and search
      {showPicker && (
        <EmojiSelector
          onEmojiSelected={handleEmojiSelect}
          category={Categories.all}
          showTabs={true}
          showSearchBar={true}
          showHistory={true}
          columns={10}
          placeholder='Search emoji...'
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  pickerButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});